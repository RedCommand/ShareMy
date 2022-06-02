import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './src/navigation/AppNavigator';

global.serverHost = 'liveboxlabuche.hopto.org';
global.serverPort = 3002;

export default function App() {
  return (
    <MainNavigator />
  );
}
