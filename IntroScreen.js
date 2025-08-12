import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/IntroScreenStyle';

export default function IntroScreen({ onDone }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Coffee Shop App!</Text>
      <Text style={styles.subtitle}>
        Discover and order your favorite drinks with ease.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onDone}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
