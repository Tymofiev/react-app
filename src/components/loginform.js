import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import loginFunc from '../api/index'
import validate from '../lib/validation'

export default class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = { login: '', pass: '', errors: [] }

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()

		let login = this.state.login
		let password = this.state.pass

		validate(login, password)
			.then(() => {
				loginFunc(login, password)
					.then((res) => {
						console.log(res.data.token)
						localStorage.setItem('token', res.data.token)
						this.setState({ errors: [] })
						this.props.history.push('/')
					})
					.catch((e) => {
						console.log(e)
						this.setState((prevState) => ({
							errors: [
								...prevState.errors,
								{ id: 'error', msg: 'Incorrect login or password' },
							],
						}))
					})
			})
			.catch((err) => {
				let arr = []
				err.errors.forEach((e) => {
					arr.push({
						id: e,
						msg: e,
					})
				})

				this.setState({ errors: arr })
			})
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
					<h1>Login form</h1>
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
													<br />
												</small>
										  ))
										: ''}
									<Button
										className='btn btn-block submit_button'
										variant='primary'
										type='submit'
									>
										Log in
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
