import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import RegisterForm from './components/registerform'
import LoginForm from './components/loginform'
import Home from './components/home'

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact={true} path='/' component={Home} />
				<Route path='/login' component={LoginForm} />
				<Route path='/register' component={RegisterForm} />
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
