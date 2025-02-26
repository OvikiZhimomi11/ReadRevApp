// ResetPasswordScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { useRoute, useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = ({ route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [oobCode, setOobCode] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();

  // Set the oobCode when the component mounts
  useEffect(() => {
    if (route.params?.oobCode) {
      setOobCode(route.params.oobCode);
    }
  }, [route.params]);

  const handleResetPassword = () => {
    if (!oobCode) {
      Alert.alert('Error', 'Invalid or missing reset code.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        Alert.alert('Success', 'Password reset successful! Please log in.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default ResetPasswordScreen;
