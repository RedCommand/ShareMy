import React from 'react';
import { TextInput, Image, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView, StatusBar, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

exports.register = async(firstname, lastname, username, email, password) => {
    console.log(`http://${global.serverHost}:${global.serverPort}/register | ${firstname} | ${lastname} | ${username} | ${email} | ${password}`);
    await axios.post(`http://${global.serverHost}:${global.serverPort}/register`, {
        'firstname': `${firstname}`,
        'lastname': `${lastname}`,
        'username': `${username}`,
        'email': `${email}`,
        'password': `${password}`,
    }).then(res => {
        console.log(res.data.token);
        return res.data.token;
    }).catch((err) => {
        if (err.response.status == 401) {
            Alert.alert(
                "Invalid Credentials",
                "Username or Password is incorrect", [{
                    text: "Ok",
                    style: "Ok"
                }]
            );
            console.log(`invalid credentials !`)
            return null;
        }
        console.error(err)
        return null;
    });
}