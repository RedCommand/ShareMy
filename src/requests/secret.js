import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";

import { ToastAlert } from "../components/ToastAlert";
import { login } from "./login";

exports.storeUserSession = async (username, password, navigation) => {
    try {
        EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                username: username,
                password: password,
            })
        );
        console.log("user session stored !");
        return;
    } catch (error) {
        console.error(`failed to store user session : ${error}`);
        ToastAlert(`ERROR: ${error}`);
        return;
    }
};

exports.retrieveUserSession = async (navigation, log_user) => {
    EncryptedStorage.getItem("user_session")
        .then((session_str) => {
            const session = JSON.parse(session_str);

            if (
                session === undefined ||
                session.username === undefined ||
                session.password === undefined
            )
                throw new Error("Invalid session found");
            if (session === null) throw new Error("No user session found");
            // TODO log use in with creaditentials, login will to go home screen by itself
            if (log_user === false) return;
            login(
                session.username,
                session.password,
                navigation,
                (callback) => {
                    if (callback != 1) {
                        throw new Error("Fail to login with stored session");
                    }
                }
            );
            return;
        })
        .catch((error) => {
            if (error.message != "No user session found")
                console.log("No user session found");
            else console.error(`failed to retrieve user session : ${error}`);
            navigation.navigate("Login");
            return;
        });
};

exports.deleteUserSession = async () => {
    try {
        await EncryptedStorage.removeItem("user_session");
        console.log("user session deleted !");
        return;
    } catch (error) {
        console.error(`failed to delete user session : ${error}`);
        return;
    }
};
