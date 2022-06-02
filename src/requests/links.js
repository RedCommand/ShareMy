import React from 'react';
import { TextInput, Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar, Button, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

exports.get_all_links = async (token, callback) => {
    console.log(`http://${global.serverHost}:${global.serverPort}/user/users | token : ${!(!token)}`);
    await axios.get(`http://${global.serverHost}:${global.serverPort}/user/users`,
        {
            headers: {
                'token': `${token}`,
            }
        }).then(res => {
            console.log('res.data', res.data);
            if (!res.data.links.length) {
                callback(null);
                return;
            }
            callback(res.data.links);
            return;
        }).catch((err) => {
            if (err.response.status == 401) {
                Alert.alert(
                    "Invalid Credentials",
                    "Username or Password is incorrect",
                    [{
                        text: "Ok",
                        style: "Ok"
                    }]
                );
                console.log(`invalid credentials !`)
                callback(null);
                return;
            }
            console.error(err)
            callback(null);
            return;
        }
    );
}