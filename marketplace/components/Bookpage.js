import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import theme from '../styling/theme'


const GEOCODING_API_KEY = 'AIzaSyCaeHkurWGN6xWRe3C52QT308uVijmhZYo';

const fetchCoordinates = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`
  );
  const data = await response.json();
  console.log("API Response:", data); // Log the full response

  if (data.status !== 'OK') {
    throw new Error(`Geocoding API returned status: ${data.status}`);
  }

  if (data.results && data.results.length > 0) {
    return data.results[0].geometry.location;
  } else {
    throw new Error('Failed to fetch coordinates');
  }
};

const BookPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('Perfekt stand');
  const [address, setAddress] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async () => {
    if (!title || !price || !quality || !address) {
      console.log('Mangler værdier')
      alert('Please fill out all fields.');
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('Please log in before adding a book.');
      return;
    }

    try {
      const { lat, lng } = await fetchCoordinates(address);
      
      const bookData = { 
        title, 
        price, 
        quality, 
        address,
        latitude: lat,
        longitude: lng,
        email: currentUser.email,
        userId: currentUser.uid
      };

      console.log(bookData); // Logging data before database write

      const booksRef = collection(db, 'books');
      await addDoc(booksRef, bookData);
      
      alert('Book added successfully!');
      console.log(`Bog uploaded af ${currentUser.email}`) 

      setTitle('');
      setPrice('');
      setAddress('');
    } catch (e) {
      alert('Error adding book: ' + e.toString());
      console.log('Fejl i at indsætte bog')
    }
  };

  console.log(theme.styles);

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Book Title"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={quality}
        style={[styles.input, theme.styles.picker]}
        itemStyle={theme.styles.pickerItem}
        onValueChange={(itemValue) => setQuality(itemValue)}
      >
        <Picker.Item label="Perfekt stand" value="Perfekt stand" />
        <Picker.Item label="God stand" value="God stand" />
        <Picker.Item label="Okay stand" value="Okay stand" />
        <Picker.Item label="Dårlig stand" value="Dårlig stand" />
      </Picker>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        />
      <View style={styles.buttonContainer}>
        <Button title="Add Book" onPress={handleSubmit} color={theme.colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  input: {
    marginVertical: theme.spacing.small,
    backgroundColor: theme.colors.white, 
  },
  buttonContainer: {
    marginTop: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
  },
});

export default BookPage;
