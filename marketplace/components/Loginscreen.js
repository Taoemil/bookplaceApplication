import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import firebaseApp from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
  const auth = getAuth(firebaseApp);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed up
        Alert.alert('Signed up successfully!');
      })
      .catch(error => {
        // Error signing up
        Alert.alert('Error', error.message);
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully logged in
        Alert.alert('Logged in successfully!');
      })
      .catch(error => {
        // Error logging in
        Alert.alert('Error', error.message);
      });
  }

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
     <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} /> 


      <Button title="Go to homescreen" onPress={() => navigation.navigate('HomeScreen')} />
      <Button title="Go to User Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to Book Page" onPress={() => navigation.navigate('BookPage')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  }
});

export default LoginScreen;
