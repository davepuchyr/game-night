import React from 'react';

const SplashVideo = () => {
	return (
					<div className="container-main splashscreen video">
						<iframe width="100%" height="100%" src="https://www.youtube.com/embed/LJ0zGxxO_Wc?list=PL9X62Wu-yBvUAUk93hLb3N447RRnNW05G&rel=0&version=3&autoplay=1&loop=1&controls=0&showinfo=0&mute=1" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen>
							</iframe>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 61.7" preserveAspectRatio="xMidYMid slice">
								<defs>
									<mask id="mask" x="0" y="0" width="100%" height="100%" >
										<rect x="0" y="0" width="100%" height="100%" />
										<text x="41%" y="45%">Game</text>
										<text x="40.7%" y="90%">Night</text>
									 </mask>
								</defs>
								<rect x="0" y="0" width="100%" height="100%" style={{fill:'#23272A'}}/>
							</svg>
					</div>
					)
}

export default SplashVideo
