import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView,
} from "react-native";
import InteractiveTextInput from "react-native-text-input-interactive";
import { useNavigation } from "@react-navigation/native";
import { ToastAlert } from "../components/ToastAlert";

import { register } from "../requests/register";
import { storeUserSession } from "../requests/secret";

const { width: ScreenWidth } = Dimensions.get("screen");

export default function RegisterScreen() {
    const [lastname, setLastname] = useState(0);
    const [firstname, setFirstname] = useState(0);
    const [email, setEmail] = useState(0);
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    const [checkPassword, setCheckPassword] = useState(0);

    const navigation = useNavigation();

    const renderHeader = () => (
        <View style={{ marginTop: 24 }}>
            <Text
                style={{ color: "#2a41cb", fontWeight: "bold", fontSize: 32 }}
            >
                Hello There 👋
            </Text>
            <Text style={{ color: "#8e9496", letterSpacing: 1, marginTop: 8 }}>
                I am so happy to meet you. You can register and start managing
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
                placeholder="Firstname"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                onChangeText={(text) => setFirstname(text)}
            />
            <InteractiveTextInput
                autoCapitalize="none"
                placeholder="Lastname"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                onChangeText={(text) => setLastname(text)}
            />
            <InteractiveTextInput
                autoCapitalize="none"
                placeholder="Email"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                onChangeText={(text) => setEmail(text)}
            />
            <InteractiveTextInput
                autoCapitalize="none"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <InteractiveTextInput
                autoCapitalize="none"
                textInputStyle={{ width: ScreenWidth * 0.88, marginTop: 15 }}
                placeholder="Verify password"
                secureTextEntry
                onChangeText={(text) => setCheckPassword(text)}
            />
        </View>
    );

    const renderRegisterButton = () => (
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
                if (password != checkPassword) {
                    ToastAlert("Password doesn't match !");
                    return;
                }
                register(
                    username,
                    password,
                    lastname,
                    firstname,
                    email,
                    navigation,
                    (status) => {
                        if (status != 1) {
                            ToastAlert("username or email already taken !");
                            return;
                        }
                        storeUserSession(username, password, navigation);
                    }
                );
            }}
        >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Register</Text>
        </TouchableOpacity>
    );

    const renderDontHaveAccountButton = () => (
        <TouchableOpacity
            style={{
                marginTop: ScreenWidth * 0.65,
                alignItems: "center",
                marginBottom: 84,
            }}
            onPress={() => navigation.goBack()}
        >
            <Text style={{ fontWeight: "700" }}>Alreacy have an account</Text>
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
            <ScrollView>
                {renderTextInputs()}
                {renderRegisterButton()}
                {renderDontHaveAccountButton()}
            </ScrollView>
        </SafeAreaView>
    );
}
