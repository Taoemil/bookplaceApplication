import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import for authentication

const BookPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [quality, setQuality] = useState('Perfekt stand'); // default value
    const [address, setAddress] = useState('');

    const db = getFirestore();
    const auth = getAuth(); // Initialize authentication

    const handleSubmit = async () => {
        if (!title || !price || !quality || !address) {
          console.log('Mangler værdier')
            alert('Please fill out all fields.');
            return;
        }

        try {
            const currentUser = auth.currentUser; // Get the current logged-in user

            if (!currentUser) {
                alert('Please log in before adding a book.');
                return;
            }

            const booksRef = collection(db, 'books');
            await addDoc(booksRef, { 
                title, 
                price, 
                quality, 
                address,
                userId: currentUser.uid // Link the book to the user
            });
            alert('Book added successfully!');
            console.log(`Bog uploaded af ${currentUser.email}`) 

            // Clear the input fields after submission
            setTitle('');
            setPrice('');
            setAddress('');
        } catch (e) {
            alert('Error adding book: ', e);
            console.log('Fejl i at indsætte bog')
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Book Title"
                style={styles.input}
            />
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="Price"
                style={styles.input}
                keyboardType="numeric"
            />
            <Picker
                selectedValue={quality}
                style={styles.input}
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
                style={styles.input}
            />
            <Button title="Add Book" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 10,
    },
});

export default BookPage;
