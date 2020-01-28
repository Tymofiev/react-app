import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import store from '../lib/store'
import { fetchNumbers } from '../actions/numberActions'
import Spinner from '../components/spinner'

class Calculator extends Component {
	constructor(props) {
		super(props)

		this.addition = this.addition.bind(this)
		this.subtraction = this.subtraction.bind(this)
	}

	addition() {
		store.dispatch({ type: 'INCREMENT', payload: 1 })
	}

	subtraction() {
		store.dispatch({ type: 'DECREMENT', payload: 1 })
	}

	componentDidMount() {
		this.props.fetchNumbers()
	}

	render() {
		const { isFetching } = this.props
		if (isFetching) {
			return <Spinner />
		}

		return (
			<div className='App'>
				<header className='App-header'>
					<h1>Calculator</h1>
				</header>
				<section className='App-content'>
					<div className='container'>
						<div className='row d-flex justify-content-center'>
							<div className='col-md-6'>
								<Button
									className='btn btn-block submit_button'
									variant='primary'
									onClick={this.subtraction}
								>
									-
								</Button>
								<h1>{this.props.value}</h1>
								<Button
									className='btn btn-block submit_button'
									variant='primary'
									onClick={this.addition}
								>
									+
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {
		value: store.countState.value,
		numbers: store.numberState.numbers,
		isFetching: store.numberState.isFetching,
	}
}

export default connect(mapStateToProps, {
	fetchNumbers,
})(Calculator)
