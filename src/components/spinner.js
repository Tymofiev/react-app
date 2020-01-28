import React, { Component } from 'react'
import { CircleLoader } from 'react-spinners'

class Home extends Component {
	render() {
		return (
			<div className='container'>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-6'>
						<CircleLoader color='white' size='500' />
					</div>
				</div>
			</div>
		)
	}
}

export default Home
