const initialNumberState = {
	isFetching: false,
	numbers: [],
}

function numberReducer(state = initialNumberState, action) {
	switch (action.type) {
		case 'NUMBERS_FETCH_REQUEST':
			return Object.assign({}, state, {
				isFetching: true,
			})
		case 'NUMBERS_FETCH_SUCCESS':
			return Object.assign({}, state, {
				numbers: action.payload,
				isFetching: false,
			})
		default:
			return state
	}
}

export default numberReducer
