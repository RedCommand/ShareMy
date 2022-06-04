import { ToastAndroid } from "react-native";

exports.ToastAlert = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}
