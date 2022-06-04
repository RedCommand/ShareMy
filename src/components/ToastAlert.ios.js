import AlertIOS from 'react-native'

exports.ToastAlert = (message) => {
    AlertIOS.alert(message);
}