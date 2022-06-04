import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { mainNavigationRef } from "./MainNavigator.js";

import LoadingScreen from "../screens/LoadingScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js";

const MainStack = createStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer ref={mainNavigationRef}>
            <MainStack.Navigator initialRouteName="Loading">
                <MainStack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <MainStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <MainStack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
                <MainStack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
