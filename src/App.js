import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import RegisterForm from './components/registerform'
import LoginForm from './components/loginform'
import Home from './components/home'
import Calculator from './components/calculator'
import store from './lib/store'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact={true} path='/' component={Home} />
						<Route path='/login' component={LoginForm} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/calculator' component={Calculator} />
					</Switch>
				</Router>
			</Provider>
		)
	}
}

export default App
