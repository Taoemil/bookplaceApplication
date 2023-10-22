import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Added Alert here
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const [bio, setBio] = useState('');
  const [user, setUser] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();
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

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      
      try {
        await setDoc(userRef, { bio: bio }, { merge: true });
        
        // Display an alert
        Alert.alert('Success', 'Your information has been saved!');
      } catch (error) {
        console.error("Error saving user data:", error);
        Alert.alert('Error', 'There was a problem saving your data.');
      }
      
    } else {
      Alert.alert('Error', 'User is not authenticated.');
    }
};


  return (
    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="User bio"
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
});

export default UserProfile;
