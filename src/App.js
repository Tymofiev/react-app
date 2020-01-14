import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import './App.css'
import axios from 'axios'

class LoginForm extends Component {
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
			return newArray
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		let login = this.state.login
		let password = this.state.pass

		let loginSuccess = false

		axios({
			method: 'post',
			url: 'http://localhost:3001/users/login',
			data: {
				login: login,
				lastName: password,
			},
		}).then((result) => {
			loginSuccess = result.data
		})

		this.setState({ errors: [] })

		if (login === '' || password === '') {
			this.showError('empty', 'Login and password cannot be blank')
			return
		} else if (!loginSuccess) {
			this.showError('incorrect', 'Invalid login or password')
			return
		}

		alert('Succesfully logged in ', login)

		return <Redirect to='/cabinet' />
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

class Cabinet extends Component {
	render() {
		return <div>Succesfully logged in!</div>
	}
}

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact={true} path='/' component={LoginForm} />
				<Route path='/cabinet' component={Cabinet} />
			</Switch>
		)
	}
}

class App extends Component {
	render() {
		return (
			<Router>
				<Routes />
			</Router>
		)
	}
}

export default App
