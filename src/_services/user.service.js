//Adaptado de http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-service-js

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };*/

    //Solución temporal para simular login sin be

    if(username !== "123" || password !== "123"){
        return {"isLoggedIn": false};
    }

    localStorage.setItem('uid', 1);
    localStorage.setItem('isLoggedIn', true);
    return {"uid": 1,
            "isLoggedIn": true};

    // Reemplazar aquí el fetch 


    /*return fetch('/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', true);

            return user;
        });*/
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('uid');
    localStorage.setItem('isLoggedIn', false);
}

function register(user) {
    
    //Enviar petición a BE para POST user.

    //return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

