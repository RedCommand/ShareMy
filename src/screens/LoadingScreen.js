import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { retrieveUserSession } = require("../requests/secret");

export default function LoadingScreen() {
    const navigation = useNavigation();

    const loadSession = async () => {
        await retrieveUserSession(navigation);
    }

    useFocusEffect(() => {
        console.log("LoadingScreen");
        loadSession();
    });

    return (
        <View style={styles.root}>
            <Text>Splash Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
