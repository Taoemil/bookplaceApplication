import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import theme from '../styling/theme';

// Fungere udelukkende som navigering mellem den reele funktionalitet. 


const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Book Marketplace!</Text>
        
        <View style={styles.buttonContainer}>
            <Button 
                title="Din brugerprofil" 
                onPress={() => navigation.navigate('Profile')} 
                color={theme.colors.primary}
            />
            <Button 
                title="Sæt en bog til salg" 
                onPress={() => navigation.navigate('BookPage')} 
                color={theme.colors.primary}
            />
            <Button 
                title="Se bøger til salg" 
                onPress={() => navigation.navigate('BookMaps')} 
                color={theme.colors.primary}
            />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background
  },
  title: {
    fontSize: theme.fontSize.xlarge,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    color: theme.colors.textPrimary
  },
  buttonContainer: {
    width: '110%',  // Adjust as needed for your design
    marginTop: theme.spacing.large
  }
});

export default HomeScreen;
