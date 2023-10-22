import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const BookMaps = () => {
  const [books, setBooks] = useState([]);
  
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
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>Title: {item.title}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quality: {item.quality}</Text>
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
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
});

export default BookMaps;
