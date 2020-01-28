import axios from 'axios'

const fetchNumbers = () => (dispatch) => {
	dispatch({
		type: 'NUMBERS_FETCH_REQUEST',
	})

	axios
		.get('http://localhost:3001/numbers')
		.then((res) => {
			dispatch({
				type: 'NUMBERS_FETCH_SUCCESS',
				payload: res.data,
			})
		})
		.catch((err) => {
			console.log(err.message)
		})
}

export { fetchNumbers }
