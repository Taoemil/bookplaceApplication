import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Book Marketplace!</Text>
        <Button title="Go to User Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Upload a book" onPress={() => navigation.navigate('BookPage')} />
        <Button title="See all listed books" onPress={() => navigation.navigate('BookMaps')} />

      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;