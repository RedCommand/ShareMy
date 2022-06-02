import React from "react";
import {
    TextInput,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableHighlight,
    ScrollView,
    Alert,
    StatusBar,
    Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";

const { login } = require("./login");

exports.getUserToken = async () => {
    try {
        const user_token = await AsyncStorage.getItem("user_token");

        if (user_token != null) {
            return user_token;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

exports.setUserToken = async (user_token) => {
    try {
        await AsyncStorage.setItem("user_token", `${user_token}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

exports.storeUserSession = async (username, password) => {
    await login(username, password, (callback) => {
        if (callback != 1) {
            Alert.alert(
                "Invalid Credentials",
                "Username or Password is incorrect",
                [{
                    text: "Ok",
                    style: "Ok"
                }]
            );
            return;
        }
        try {
            EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    username: username,
                    password: password,
                })
            );
            console.log("user session stored !");
        } catch (error) {
            console.error(`failed to store user session : ${error}`);
        }
    });
};

retrieveUserSession = async () => {
    try {
        const session = await EncryptedStorage.getItem("user_session");

        if (
            session !== undefined &&
            session.username !== undefined &&
            session.password !== undefined
        ) {
            // Congrats! You've just retrieved your first value!
        }
    } catch (error) {
        console.error(`failed to retrieve user session : ${error}`);
    }
};
