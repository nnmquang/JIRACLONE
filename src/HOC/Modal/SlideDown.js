import React from 'react';
import {useSpring,animated} from 'react-spring'



export default function SlideDown(Component) {

    const propsSpring = useSpring({
    to: {
        marginTop:'0'
    },from: {
        marginTop:'-100%'
    },config:{
        duration:2000
    }})


  return (
      <div>
          <animated.div style={propsSpring}>
              <Component/>
                {/* dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd
                dshdsdhshdsjhdsdjjshdjshdshdshdshddddddddddddddddd */}
          </animated.div>
      </div>
  )
}
