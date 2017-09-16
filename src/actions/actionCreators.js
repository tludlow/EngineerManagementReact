import axios from "axios";
import {browserHistory} from "react-router";

//User actions
//Signup
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

//Post action creators

export function postCreationRequest() {
  return {type: 'POST_CREATION_REQUEST'}
}

export function postCreationSuccess(post) {
  return {type: 'POST_CREATION_REQUEST', data: post}
}

export function postCreationFailure(err) {
  return {type: 'POST_CREATION_REQUEST', error: err}
}

export function createNewPost(author, title, body, category) {
  return dispatch => {
    dispatch(postCreationRequest());
    return axios({
      method: 'post',
      url: 'http://localhost:7770/storie/addStorie',
      data: {
        author: author,
        title: title,
        body: body,
        category: category
      },
      headers: {
        'Authorization': `Token ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      dispatch(postCreationSuccess(response.data.post));
      browserHistory.push("/");
    }).catch((err) => {
      dispatch(postCreationFailure("There was an error creating your post"));
    });
  }
}