import {
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";


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
