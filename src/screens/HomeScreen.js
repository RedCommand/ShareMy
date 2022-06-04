import React from "react";
import { View, StyleSheet,  Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { retrieveUserSession, deleteUserSession } from "../requests/secret";

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Button
                title="log creditentials"
                onPress={() => {
                    retrieveUserSession(navigation, false);
                }}
            />
            <Button
                title="remove creditentials"
                onPress={() => {
                    deleteUserSession();
                    navigation.navigate("Loading");
                }}
            />
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
