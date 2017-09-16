function user(state = {}, action) {
	switch (action.type) {
		case 'USER_SIGNUP_REQUEST':
			return {...state, loading: true}
		case 'USER_SIGNUP_SUCCESS':
			return {...state, loading: false, data: action.data, isLoggedIn: true}
		case 'USER_SIGNUP_FAILURE':
			return {...state, loading: false, error: action.error}
		case 'USER_LOGIN_REQUEST':
			return {...state, loading: true}
		case 'USER_LOGIN_SUCCESS':
			return {...state, loading: false, data: action.data, isLoggedIn: true}
		case 'USER_LOGIN_FAILURE':
			return {...state, loading: false, error: action.error}
		case 'USER_LOGOUT':
			return {...state, loading: false, data: {username: ""}, isLoggedIn: false}
		default:
			return state;
	}
}

export default user;