import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen.js";

const MainStack = createStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Login">
                <MainStack.Screen name="Login" component={LoginScreen} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
