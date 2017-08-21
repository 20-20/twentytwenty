
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
		super(props)
	}

	render() {
		const addUser = this.props.addUser
		return (
			<div className='section'>
				<div className='container'>
					<div className="columns">
						<div className="column">
							<div className='field' >
								<form onSubmit={evt => {
									evt.preventDefault()
									const newUser = {
										name : evt.target.name.value,
										email: evt.target.email.value,
										password: evt.target.password.value
									}
									addUser(newUser)
									this.props.history.push('/')
								}}>
									<div className='form-group'>
										<label className='label'>
											Name
										</label>
										<div className='control'>
											<input name='name' className='input' required='' />
										</div>
									</div>
									<div className='form-group'>
										<label className='label'>
											Email
										</label>
										<div className='control'>
											<input type='email' name='email' className='input' required='' />
										</div>
									</div>
									<br />
									<div className='form-group'>
										<label>Password</label>
										<input type='password' name='password' className='input' required='' />
									</div>
									<br />
									<div className="control">
										<button type='submit' className='button is-info'>Log in</button>
									</div>
								</form>
							</div>
						</div>
						<div className="column">
							<div className='field' >
								<label className='label'>
									Log in
								</label>
								<p>
									<NavLink target="_self" to="/api/auth/login/google" className="button btn-google is-info">
										<span className="icon">
											<i className="fa fa-google">
											</i>
										</span>
										<span>
											Log in with Google
									</span>
									</NavLink>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

import { addUser } from 'APP/app/reducers/users'
import { connect } from 'react-redux'

export default connect(
  state => ({}),
  { addUser },
)(Signup)
