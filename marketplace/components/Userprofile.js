import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here is your profile!</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Go to User Profile" onPress={() => navigation.navigate('HomeScreen')} />
        <Button title="Go to Book Page" onPress={() => navigation.navigate('BookPage')} />
      {/* You can add more UI elements here as per your requirements */}
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

export default UserProfile;