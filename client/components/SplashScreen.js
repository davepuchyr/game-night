import React from 'react'
import {Link} from 'react-router-dom'
import { Login, Signup } from './index'

/**
 * COMPONENT
 * All credits to : https://codepen.io/SimonEvans/pen/weoLLB
 */

 const SplashScreen = (props) => {
	const {isLoggedIn} = props
	return (
					<div className="container-main splashscreen">
						<div className="container-main splashscreen-video">
							<iframe width="1280" height="720" src="https://www.youtube.com/embed/LJ0zGxxO_Wc?list=PL9X62Wu-yBvUAUk93hLb3N447RRnNW05G&rel=0&version=3&autoplay=1&loop=1&controls=0&showinfo=0&mute=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen>
							</iframe>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 80" preserveAspectRatio="xMidYMid slice">
								<defs>
									<mask id="mask" x="0" y="0" width="100%" height="100%" >
										<rect x="0" y="0" width="100%" height="100%" />
										<text x="195" y="30">Game</text>
										<text x="195" y="60">Night</text>

									 </mask>
								</defs>
								<rect x="0" y="0" width="100%" height="100%" />
							</svg>
						</div>
						<div className="container-main splashscreen-login-button">
							<button id="loginBtn">Login
								<Link to="/login"></Link>
							</button>
							<button id="signupBtn">Signup
								<Link to="/signup"></Link>
							</button>
						</div>
					</div>
				 )
}

export default SplashScreen
