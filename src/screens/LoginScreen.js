import React, { useState } from "react";
import {
    Alert,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
} from "react-native";
import InteractiveTextInput from "react-native-text-input-interactive";
import { useNavigation } from "@react-navigation/native";
import { ToastAlert } from "../components/ToastAlert";

import { login } from "../requests/login";
import { storeUserSession } from "../requests/secret";

const { width: ScreenWidth } = Dimensions.get("screen");

export default function LoginScreen() {
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    const navigation = useNavigation();

    const renderHeader = () => (
        <View style={{ marginTop: 24 }}>
            <Text
                style={{ color: "#2a41cb", fontWeight: "bold", fontSize: 32 }}
            >
                Welcome Back 👋
            </Text>
            <Text style={{ color: "#8e9496", letterSpacing: 1, marginTop: 8 }}>
                I am so happy to see you. You can continue to login for manage
                your cards !
            </Text>
        </View>
    );

    const renderTextInputs = () => (
        <View style={{ marginTop: 52 }}>
            <InteractiveTextInput
                autoCapitalize="none"
                placeholder="Username"
                textInputStyle={{ width: ScreenWidth * 0.88 }}
                onChangeText={(text) => setUsername(text)}
            />
            <InteractiveTextInput
                autoCapitalize="none"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={{ marginLeft: "auto", marginTop: 16 }}>
                <Text style={{ color: "#2a41cb", fontWeight: "500" }}>
                    Forgot Password? (Not implemented yet)
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderLoginButton = () => (
        <TouchableOpacity
            style={{
                height: 50,
                width: ScreenWidth * 0.88,
                backgroundColor: "#2a41cb",
                marginTop: ScreenWidth * 0.25,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                shadowRadius: 8,
                shadowOpacity: 0.3,
                shadowColor: "#2a41cb",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
            }}
            onPress={() => {
                login(username, password, navigation, (status) => {
                    if (status != 1) {
                        ToastAlert("Invalid Credentials !");
                        return;
                    }
                    storeUserSession(username, password, navigation);
                });
            }}
        >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Login</Text>
        </TouchableOpacity>
    );

    const renderDontHaveAccountButton = () => (
        <TouchableOpacity
            style={{ marginTop: ScreenWidth * 0.65, alignItems: "center" }}
            onPress={() => navigation.navigate("Register")}
        >
            <Text style={{ fontWeight: "700" }}>Don't have an account</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginLeft: 24,
                marginRight: 24,
            }}
        >
            {renderHeader()}
            {renderTextInputs()}
            {renderLoginButton()}
            {renderDontHaveAccountButton()}
        </SafeAreaView>
    );
}
