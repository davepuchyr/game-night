import React from 'react'
import {Link} from 'react-router-dom'
import { Login, Signup, SplashVideo } from './index'

/**
 * COMPONENT
 * All credits to : https://codepen.io/SimonEvans/pen/weoLLB
 */

 const SplashScreen = (props) => {
	const {isLoggedIn} = props
	return (
					<div className="container-main splashscreen">
						<SplashVideo/>
						<div className="container-main splashscreen-login-button">
							<button id="loginBtn"><Link to="/login">Login</Link></button>
							<button id="signupBtn"><Link to="/signup">Signup</Link></button>
						</div>
					</div>
				 )
}

export default SplashScreen
