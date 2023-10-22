import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const BookPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [quality, setQuality] = useState('Perfekt stand'); // default value
    const [address, setAddress] = useState('');

    const db = getFirestore();

    const handleSubmit = async () => {
        if (!title || !price || !quality || !address) {
          console.log('Mangler værdier')
            alert('Please fill out all fields.');
            return;
        }

        try {
            const booksRef = collection(db, 'books');
            await addDoc(booksRef, { title, price, quality, address });
            alert('Book added successfully!');
            console.log('Bog indsat i database')

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
