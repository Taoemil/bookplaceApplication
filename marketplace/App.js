import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Homescreen';
import LoginScreen from './components/Loginscreen';
import UserProfile from './components/Userprofile';
import BookPage from './components/Bookpage';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2D_V7e5Srro7HM3XIwbqrZr-7hIwanGk",
  authDomain: "bookplace-fe746.firebaseapp.com",
  projectId: "bookplace-fe746",
  storageBucket: "bookplace-fe746.appspot.com",
  messagingSenderId: "547846937761",
  appId: "1:547846937761:web:d059ec5bed7683066ba4e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Book Marketplace' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'User Profile' }} />
        <Stack.Screen name="BookPage" component={BookPage} options={{ title: 'Book Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}