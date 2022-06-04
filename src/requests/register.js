import { processResponse } from "./utils";
import { setUserToken } from "./token";

exports.register = async (username, password, lastname, firstname, email, navigation, callback) => {
    console.log(
        `http://${global.serverHost}:${global.serverPort}/register | firstname: ${firstname} | lastname: ${lastname} | username: ${username} | email: ${email} | password: ${password}`
    );
    return fetch(`http://${global.serverHost}:${global.serverPort}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname: `${firstname}`,
            lastname: `${lastname}`,
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
        }),
    })
        .then(processResponse)
        .then((res) => {
            const { statusCode, data } = res;
            let login = false;

            if (statusCode == 401) {
                console.log(`username or email already taken !`);
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
