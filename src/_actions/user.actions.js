//Código adaptado de : http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#projectstructure
//Código adaptado de : http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#projectstructure

import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';

export const userActions = {
    login,
    logout
};

function login(username, password, onReady) {

    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password).then((obj) => {

            if (obj.isLoggedIn) {
                dispatch(success(obj));
            } else {
                dispatch(failure(obj));
            }

            onReady();

        })

        /*userService(username,password).then(
            user => { 
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );*/
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
