import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

export default class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = { login: '', pass: '', errors: [] }

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	showError(id, msg) {
		this.setState((prevState) => ({
			errors: [...prevState.errors, { id, msg }],
		}))
	}

	clearError(id) {
		this.setState((prevState) => {
			let newArray = []
			for (let err of prevState.errors) {
				if (id !== err.id) {
					newArray.push(err)
				}
			}
			return { errors: newArray }
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		let login = this.state.login
		let password = this.state.pass
		let loginBusy = false

		if (login === '' || password === '') {
			this.clearError('empty')
			this.showError('empty', 'Login and password cannot be blank')
			return
		}

		axios({
			method: 'post',
			url: 'http://localhost:3001/users/register',
			data: {
				login: login,
				password: password,
			},
		}).then((result) => {
			loginBusy = result.data

			if (loginBusy) {
				this.showError('busy', 'Login already exists')
				return
			}
			return this.props.history.push('/')
		})

		this.setState({ errors: [] })
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<h1>Sign up form</h1>
				</header>
				<section className='App-content'>
					<div className='container'>
						<div className='row d-flex justify-content-center'>
							<div className='col-md-6'>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId='formBasicEmail'>
										<Form.Label>Login</Form.Label>
										<Form.Control
											name='login'
											type='text'
											value={this.state.login}
											onChange={this.handleChange}
											placeholder='Enter login'
										/>
									</Form.Group>

									<Form.Group controlId='formBasicPassword'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											name='pass'
											type='password'
											value={this.state.pass}
											onChange={this.handleChange}
											placeholder='Password'
										/>
									</Form.Group>
									{this.state.errors
										? this.state.errors.map((error) => (
												<small className='errors' key={error.id}>
													{error.msg}
												</small>
										  ))
										: ''}
									<Button
										className='btn btn-block submit_button'
										variant='primary'
										type='submit'
									>
										Sign up
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}
