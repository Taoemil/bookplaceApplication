import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './components/Homescreen';  // Import the HomeScreen component
import LoginScreen from './components/Loginscreen';  // Import the loginscreen component
import UserProfile from './components/Userprofile';  // Import the userprofile component
import BookPage from './components/Bookpage';  // Import the bookpage component


export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <LoginScreen />
      <UserProfile />
      <BookPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});