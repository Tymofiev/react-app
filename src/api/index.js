import axios from 'axios'

const login = (login, password) => {
	const token = localStorage.getItem('token')
	return axios({
		method: 'post',
		url: 'http://localhost:3001/login',
		data: {
			username: login,
			password: password,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

export default login
