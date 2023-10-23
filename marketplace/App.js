//Import af diverese react-dependencies
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
// Import firebaseConfig.js first to ensure Firebase is initialized
import './firebaseConfig'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import af mine komponenter 
import HomeScreen from './components/Homescreen';
import LoginScreen from './components/Loginscreen';
import UserProfile from './components/Userprofile';
import BookPage from './components/Bookpage';
import BookMaps from './components/BookMaps';

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log('User is logged in:', user.email);  
        setCurrentUser(user);
      } else {
        // User is not logged in
        console.log('User is logged out');  
        setCurrentUser(null);
      }
    });

    // Cleanup listener 
    return () => unsubscribe();
  }, []);

  // Navigation af komponenter 
  // InitialRouteName, for at applikationen åbner på loginscreen.js --> Når man logger ind bliver man så sendt til homescreen (home)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentUser ? "Home" : "Login"}> 
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'Min profil' }} />
        <Stack.Screen name="BookPage" component={BookPage} options={{ title: 'Sæt en bog til salg' }} />
        <Stack.Screen name="BookMaps" component={BookMaps} options={{ title: 'See all listed books' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
