import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import * as Battery from 'expo-battery';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getBatteryLevel = async () => {
      try {
        const level = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
      } catch (error) {
        console.error('Error getting battery level:', error);
      }
    };

    getBatteryLevel();

    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <View style={styles.container}>
      {userEmail && (
        <Text style={styles.userDetail}>User's email address: {userEmail}</Text>
      )}
      <Text style={styles.batteryPerText} >Battery Percentage</Text>
      <Text style={styles.batteryText}>
        <MaterialCommunityIcons name="battery" size={24} color="white" />{' '}
        {batteryLevel !== null ? `${(batteryLevel * -100).toFixed(0)}%` : 'Loading...'}
      </Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('details')}
      >
        <Text style={styles.buttonText}>Open Details</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333', // Dark grey background color
  },
  userDetail: {
    marginBottom: 10,
    fontSize: 18,
    color: '#fff', // White text color for better contrast
    fontWeight: 'bold', // Make text bold
    textAlign: 'center',
  },
  batteryText: {
    marginBottom: 20,
    fontSize: 18,
    color: '#fff', // White text color for better contrast
    fontWeight: 'bold', // Make text bold
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#DAA520', // Dark yellow background color
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%', // Make buttons full width
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff', // White text color for better contrast
    fontWeight: 'bold', // Make text bold
  },
  batteryPerText: {
    marginBottom: 20,
    fontSize: 12,
    color: '#DAA520', // White text color for better contrast
    fontWeight: 'bold', // Make text bold
    textAlign: 'center',
  },
});
