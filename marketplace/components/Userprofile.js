import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import theme from '../styling/theme'


const UserProfile = () => {
  const [bio, setBio] = useState('');
  const [user, setUser] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth(); // getAuth bruges til at skabe firebase brugergodkendelse
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBio(docSnap.data().bio);
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
      }
    });
  }, [db]);

  const handleSave = async () => {
    console.log("handleSave called");  // Diagnostic log
// Tjekker om uid er tilstede, for at bruger beskrivelsen knyttes til den bruger som er logget ind
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      
      try {
        await setDoc(userRef, { bio: bio }, { merge: true });
        
        // Fortæl brugeren hvad der sker
        Alert.alert('Success', 'Din brugerbeskrivelse er gemt!');
      } catch (error) {
        console.error("Error saving user data:", error);
        Alert.alert('Fejl', 'Din brugerbeskrivelse kunne ikke opdateres');
      }
      
    } else {
      Alert.alert('Fejl', 'Bruger ikke autentiseret.');
    }
};


return (
  <View style={styles.container}>
    <Text style={styles.emailLabel}>Email: {user?.email}</Text>
    <Text style={styles.bioLabel}>Din brugerbeskrivelse</Text>
    <TextInput
      value={bio}
      onChangeText={setBio}
      placeholder="Bruger bio"
      placeholderTextColor={theme.colors.textSecondary}
      style={styles.input}
    />
    <View style={styles.buttonContainer}>
      <Button title="Gem" onPress={handleSave} color={theme.colors.primary} />
    </View>
  </View>
);
};
// Style og theme hentes fra /styling/theme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background
  },
  emailLabel: {
    fontSize: theme.fontSize.large,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
    marginBottom: 30

  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.small,
    marginVertical: theme.spacing.medium,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white
  },
  buttonContainer: {
    marginTop: theme.spacing.medium
  },
  bioLabel: {
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.small,
    textAlign: 'left',
    marginBottom: 1
  }
});

export default UserProfile;
