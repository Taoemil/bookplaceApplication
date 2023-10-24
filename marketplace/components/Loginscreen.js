import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import firebaseApp from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import theme from '../styling/theme'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
  const auth = getAuth(firebaseApp); // getAuth til firebase bruger authentication

    // Funktion til at oprette en bruger med authentication (Email/password)

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
 // Success logged ind
        Alert.alert('Bruger oprettet!');
      })
      .catch(error => {
      // Fejl logging indv
        Alert.alert('Fejl', error.message);
      });
  }
  // FUnktion til at logge ind med de oprettede bruger credentials (email/password)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully logged in
        Alert.alert('Du er nu logget ind!');
        navigation.navigate('Home');

      })
      .catch(error => {
        // Error logging in
        Alert.alert('Fejl', error.message);
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
        <Button title="Tilmeld dig!" onPress={handleSignUp} color={theme.colors.primary} />
        <Button title="Login" onPress={handleLogin} color={theme.colors.primary} />
     </View>
    </View>
  );
}
// Styles og theme fra /styling/theme

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
