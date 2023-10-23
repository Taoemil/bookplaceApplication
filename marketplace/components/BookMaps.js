import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import theme from '../styling/theme'


const BookMaps = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);

  const db = getFirestore();
  const booksRef = collection(db, 'books');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookQuery = query(booksRef);
        const querySnapshot = await getDocs(bookQuery);
        const booksList = [];
        querySnapshot.forEach((doc) => {
          booksList.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setBooks(booksList);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={isMapVisible}
            onRequestClose={() => {
                setMapVisible(false);
                setSelectedBook(null);
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: selectedBook?.latitude,
                        longitude: selectedBook?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {selectedBook && (
                        <Marker
                            coordinate={{ latitude: selectedBook.latitude, longitude: selectedBook.longitude }}
                            title={selectedBook.title}
                            description={selectedBook.address}
                        />
                    )}
                </MapView>
                <TouchableOpacity onPress={() => {
                    setMapVisible(false);
                    setSelectedBook(null);
                }} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Text>Close Map</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>

        <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.bookItem}>
                    <Text>Title: {item.title}</Text>
                    <Text>Price: {item.price}</Text>
                    <Text>Quality: {item.quality}</Text>
                    <Text>Email: {item.email}</Text>
                    <TouchableOpacity onPress={() => {
                        setSelectedBook(item);
                        setMapVisible(true);
                    }} style={styles.locationButton}>
                        <Text>See location (opens Google Maps)</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background, // Set background color here
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textPrimary,
    marginBottom: 1,
  },
  locationButton: {
    marginTop: 5,
    backgroundColor: theme.colors.primary, // Updated button color here
    padding: 5,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

export default BookMaps;
