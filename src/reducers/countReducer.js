const initialCountState = {
	value: 0,
}

function countReducer(state = initialCountState, action) {
	switch (action.type) {
		case 'INCREMENT':
			return Object.assign({}, state.value, {
				value: state.value + action.payload,
			})
		case 'DECREMENT':
			return Object.assign({}, state.value, {
				value: state.value - action.payload,
			})
		default:
			return state
	}
}

export default countReducer
