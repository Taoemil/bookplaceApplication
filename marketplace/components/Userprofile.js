import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { bio: bio }, { merge: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: {user?.email}</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Tell something about yourself"
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
