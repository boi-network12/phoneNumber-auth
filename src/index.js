import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { app, auth } from '../config';
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
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text>Login using OTP</Text>
      <TextInput
        placeholder="Phone number with country code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        value={phoneNumber}
      />
      <TouchableOpacity onPress={sendVerification}>
        <Text>Send Verification</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm code"
        onChangeText={setCode}
        keyboardType="number-pad"
        value={code}
      />
      <TouchableOpacity onPress={confirmCode}>
        <Text>Confirm Code</Text>
      </TouchableOpacity>
    </View>
  );
}
