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
    StatusBar,
    Button,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const { processResponse } = require("./utils");

exports.login = async (username, password, callback) => {
    console.log(
        `'http://${global.serverHost}:${global.serverPort}/login' | ${username} | ${password}`
    );
    return fetch(`http://${global.serverHost}:${global.serverPort}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
        })
    })
        .then(processResponse)
        .then((res) => {
            const { statusCode, data } = res;
            if (statusCode == 401) {
                console.log(`invalid credentials !`);
                callback(0);
                return;
            }
            if (!data.token)
                throw new Error('Missing token in response');
            callback(1);
            console.log("test");
            return;
        })
        .catch((error) => {
            console.error(error);
            callback(-1);
            return;
        });
};
