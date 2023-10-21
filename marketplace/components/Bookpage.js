import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BookPage = ( { navigation } ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy/sell books!</Text>
      <Button title="Go to Homescreen" onPress={() => navigation.navigate('Home')} />
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

export default BookPage;