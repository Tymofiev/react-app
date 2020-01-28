import * as yup from 'yup'

const schema = yup.object().shape({
	login: yup.string().required('Login is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password should be longer than 6'),
})

const validate = (login, password) => {
	return schema.validate(
		{
			login: login,
			password: password,
		},
		{ abortEarly: false },
	)
}

export default validate
