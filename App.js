import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import SignInScreen from './Screens/auth/SignInScreen';
import SignUpScreen from './Screens/auth/SignUpScreen';
import IntroScreen from './Screens/IntroScreen';
import BottomTabs from './navigation/BottomTabs';
import { CartProvider } from './contexts/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const introSeen = await AsyncStorage.getItem('introSeen');
        setShowIntro(!introSeen);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleIntroDone = async () => {
    await AsyncStorage.setItem('introSeen', 'true');
    setShowIntro(false);
  };

  if (isLoading) return null;

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : showIntro ? (
            <Stack.Screen name="Intro">
              {(props) => <IntroScreen {...props} onDone={handleIntroDone} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main" component={BottomTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
