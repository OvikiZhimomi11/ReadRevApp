import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SplashScreen from 'react-native-splash-screen'; // Correct import for hiding splash screen

// Import screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import FreeBooksScreen from './screens/FreeBooksScreen';
import BookDetails from './screens/BookDetails';
import PDFViewer from './screens/PDFViewer';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAft9_yiJWND_ztazXX9KqMM8dxRNjq9rQ",
  authDomain: "read-rev.firebaseapp.com",
  projectId: "read-rev",
  storageBucket: "read-rev.firebasestorage.app",
  messagingSenderId: "736246244346",
  appId: "1:736246244346:web:dcf3a84fd653502d3d3a43",
  measurementId: "G-PYSRS8MGM3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  const navigationRef = useRef();

  useEffect(() => {
    // Hide the splash screen once the app loads
    SplashScreen.hide();

    const handleDeepLink = async (link) => {
      if (link?.url) {
        const urlParams = new URL(link.url);
        const oobCode = urlParams.searchParams.get('oobCode');
        if (oobCode) {
          navigationRef.current?.navigate('ResetPassword', { oobCode });
        }
      }
    };

    // Handle initial deep link when app is launched
    const handleInitialLink = async () => {
      const initialLink = await dynamicLinks().getInitialLink();
      if (initialLink) {
        handleDeepLink(initialLink);
      }
    };

    handleInitialLink();

    // Listen for deep links while app is running
    const unsubscribe = dynamicLinks().onLink(handleDeepLink);
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="FreeBooks" 
          component={FreeBooksScreen} 
          options={{ title: 'Free Books' }} 
        />
        <Stack.Screen 
          name="BookDetails" 
          component={BookDetails} 
          options={{ title: 'Book Details' }} 
        />
        <Stack.Screen 
          name="PDFViewer" 
          component={PDFViewer} 
          options={{ title: 'Read Book' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
