//Adaptado de http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-service-js

var md5 = require('md5');

export const userService = {
    login,
    logout,
};

function login(username, password) {

    return new Promise((resolve, reject) => {

        fetch("/api/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "nickname": username, "password": md5(password) })
        }).then(async (res) => {
            return res.json()
        }).then((res) => {

            console.log("login fetch")
            console.log(res);

            if (res.message === "Authentication successful!") {
                let user = {
                    "uid": res.user.id,
                    "isLoggedIn": true,
                    "token": res.token
                };

                localStorage.setItem("user", JSON.stringify(user));
                console.log("LS ITEM SET");

                console.log("LOCALSTORAGE");
                console.log(localStorage.getItem("user").token);
                resolve(user);
            } else {
                //localStorage.setItem("user", JSON.stringify({ "isLoggedIn": false });
                resolve({ "isLoggedIn": false });
            }
        });
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}