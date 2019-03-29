//Código adaptado de : http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#projectstructure
//Código adaptado de : http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#projectstructure

import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';
import {store} from '../_helpers/store'

export const userActions = {
    login,
    logout
};

function login(username, password) {
   
    return dispatch => {
        dispatch(request({ username }));

        
        dispatch(success(userService.login(username, password)));

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