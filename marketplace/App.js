import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Homescreen';
import LoginScreen from './components/Loginscreen';
import UserProfile from './components/Userprofile';
import BookPage from './components/Bookpage';

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