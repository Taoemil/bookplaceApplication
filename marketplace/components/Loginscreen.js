import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import firebaseApp from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import theme from '../styling/theme'

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
        navigation.navigate('Home');

      })
      .catch(error => {
        // Error logging in
        Alert.alert('Error', error.message);
      });
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.textSecondary}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

     <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color={theme.colors.primary} />
        <Button title="Login" onPress={handleLogin} color={theme.colors.secondary} />
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background
  },
  title: {
    fontSize: theme.fontSize.xlarge,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.large
  },
  input: {
    height: 50,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.small,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default LoginScreen;
