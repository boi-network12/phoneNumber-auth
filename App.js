import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { app, auth, firebaseConfig } from './config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

export default function Otp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setPhoneNumber('');
    } catch (error) {
      Alert.alert('Error sending verification', error.message);
    }
  };

  const confirmCode = async () => {
    if (!verificationId) {
      Alert.alert('Error', 'Please request verification code first.');
      return;
    }
    const credential = PhoneAuthProvider.credential(verificationId, code);
    try {
      await signInWithCredential(auth, credential);
      setCode('');
      Alert.alert('Login successful');
    } catch (error) {
      Alert.alert('Error confirming code', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.header}>Login using OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number with country code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        value={phoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={sendVerification}>
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Confirm code"
        onChangeText={setCode}
        keyboardType="number-pad"
        value={code}
      />
      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
