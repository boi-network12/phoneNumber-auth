import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCF0VV0DtpmSUiZByOn845BeAa1F2-u8UA",
  authDomain: "realtime-513e7.firebaseapp.com",
  projectId: "realtime-513e7",
  storageBucket: "realtime-513e7.appspot.com",
  messagingSenderId: "180749865975",
  appId: "1:180749865975:web:7ca8a21fd5c341b94794f2",
  measurementId: "G-6X56EJ7JCB"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);

  // Initialize Auth with AsyncStorage for persistence
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp(); // if already initialized, use that one
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app, firebaseConfig };
