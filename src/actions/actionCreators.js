import axios from "axios";
import {browserHistory} from "react-router";

//User actions:

//The below actions are asynchronous so they have a request and a success failure. We can't return the outcome in the result as the server wont reply
//Instantly. This is gotten around with by having mutliple outcomes a success and failure, which we fire in the thunk function as required.
export function userSignUpRequest() {
  return {type: 'USER_SIGNUP_REQUEST'}
}
export function userSignUpSuccess(user) {
  return {type: 'USER_SIGNUP_SUCCESS', data: user}
}
export function userSignUpFailure(err) {
  return {type: 'USER_SIGNUP_FAILURE', error: err}
}
export function userLogout() {
  localStorage.removeItem("token");
  return {type: 'USER_LOGOUT'}
}

//Function used to sign up the user. Dispatches action of request, sends the request and gets a response, then dispatches success or failure depending on needed reducer action.
export function signUpUser(username, password, email) {
  return dispatch => {
    dispatch(userSignUpRequest());
    return axios
      .post('http://localhost:7770/user/signupCheck', {username, email})
      .then((response) => {
        if (response.data.error) {
          dispatch(userSignUpFailure(response.data.error));
          return;
        }
        return axios
          .post('http://localhost:7770/user/signup', {username, password, email})
          .then((response2) => {
            localStorage.setItem("token", response2.data.token);
            dispatch(userSignUpSuccess(response2.data));
            browserHistory.push("/");
          })
          .catch((err2) => {
            dispatch(userSignUpFailure("An error occured creating your user."));
          });
      })
      .catch((err) => {
        dispatch(userSignUpFailure("There was an error checking your user, probably server related."));
      });
  }
}

//Login
export function userLoginRequest() {
  return {type: 'USER_LOGIN_REQUEST'}
}
export function userLoginSuccess(user) {
  return {type: 'USER_LOGIN_SUCCESS', data: user}
}
export function userLoginFailure(err) {
  return {type: 'USER_LOGIN_FAILURE', error: err}
}

export function loginUser(username, password) {
  return dispatch => {
    dispatch(userLoginRequest());
    return axios.post('http://localhost:7770/user/login', {username, password}).then((response) => {
        if (response.data.error) {
          dispatch(userLoginFailure(response.data.error));
          return;
        }
        localStorage.setItem("token", response.data.token);
        dispatch(userSignUpSuccess(response.data));
        browserHistory.push("/");
      }).catch((err) => {
        dispatch(userLoginFailure("There was an error logging in your user, probably server related"));
      });
  }
}
