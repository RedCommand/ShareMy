import { processResponse } from "./utils";
import { setUserToken } from "./token";

exports.login = async (username, password, navigation, callback) => {
    console.log(
        `'http://${global.serverHost}:${global.serverPort}/login' | username: ${username} | password: ${password}`
    );
    return fetch(`http://${global.serverHost}:${global.serverPort}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
        }),
    })
        .then(processResponse)
        .then((res) => {
            const { statusCode, data } = res;
            let login = false;

            if (statusCode == 401) {
                console.log(`invalid credentials !`);
                callback(0);
                return;
            }
            if (!data.token) throw new Error("Missing token in response");
            login = setUserToken(data.token);
            if (login === false) throw new Error("Failed to store token");
            callback(1);
            navigation.navigate("Home");
            return;
        })
        .catch((error) => {
            console.error(error);
            callback(-1);
            return;
        });
};
