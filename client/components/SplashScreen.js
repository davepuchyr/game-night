import React from 'react'
import {Link} from 'react-router-dom'
import { Login, Signup } from './index'
/**
 * COMPONENT
 * All credits to : https://codepen.io/SimonEvans/pen/weoLLB
 */

 // const randomVideos = () => {
 //   let videos = ["Stars.mp4","Balls_falling.mp4","Toy_train.mp4","Dices.mp4","Domino.mp4","http://mazwai.com/system/posts/videos/000/000/148/preview_mp4/kenji_kawasawa-106_balloons.mp4?1419192915"]
 //   return videos[Math.floor(Math.random()*(videos.length-0))+0]
 // }

 const SplashScreen = (props) => {
  const {isLoggedIn} = props
  return (
          <div>
            <div className="container-main splash">
               <video
                  autoplay=""
                  playsinline=""
                  preload=""
                  loop="true"
                  muted="true"
                  poster="http://i.imgur.com/xHO6DbC.png">
                 {/*<source src={randomVideos()}/>*/}
                 <source src="http://mazwai.com/system/posts/videos/000/000/148/preview_mp4/kenji_kawasawa-106_balloons.mp4?1419192915"/>
               </video>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 80"
                  preserveAspectRatio="xMidYMid slice">
                 <defs>
                   <mask id="mask" x="0" y="0" width="100%" height="100%" >
                     <rect x="0" y="0" width="100%" height="100%" />
                     <text x="184.5" y="35">Game</text>
                     <text x="183" y="75">Night</text>
                   </mask>
                 </defs>
                 <rect x="0" y="0" width="100%" height="100%" />
               </svg>
            </div>
            <div className="container-main-button">
             <button>
              <Link to="/login">Login</Link>
              </button>
             <button>
              <Link to="/signup">Signup</Link>
            </button>
            </div>
          </div>
         )
}

export default SplashScreen
