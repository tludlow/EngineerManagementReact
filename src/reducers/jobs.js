//Switch statement that handles all job related actions.
function jobs(state = {}, action) {
	switch (action.type) {
		case 'CREATEJOB_REQUEST':
			return {...state, loading: true}
            case 'CREATEJOB_SUCCESS':
			return {...state, loading: false, data: action.data}
            case 'CREATEJOB_FAILURE':
			return {...state, loading: false, error: action.error}
		default:
			return state;
	}
}

export default jobs;