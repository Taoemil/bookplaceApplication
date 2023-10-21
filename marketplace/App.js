import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

// Import firebaseConfig.js first to ensure Firebase is initialized
import './firebaseConfig'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import HomeScreen from './components/Homescreen';
import LoginScreen from './components/Loginscreen';
import UserProfile from './components/Userprofile';
import BookPage from './components/Bookpage';

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log('User is logged in:', user.email);  // <-- Added this line
        setCurrentUser(user);
      } else {
        // User is not logged in
        console.log('User is logged out');  // <-- Added this line
        setCurrentUser(null);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentUser ? "Home" : "Login"}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Homescreen' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'My Profile' }} />
        <Stack.Screen name="BookPage" component={BookPage} options={{ title: 'Buy or sell books' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
