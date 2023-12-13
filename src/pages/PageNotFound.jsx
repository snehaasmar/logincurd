import React from 'react'
import Lottie from 'react-lottie-player'
import ErrorJson from '../Assets/Lottie Animations/lottieflow-404-12-3-000000-easey.json'

function PageNotFound() {
  return (
    <>
        <div className="w-full h-full flex justify-center items-center">
        <Lottie
      loop
      animationData={ErrorJson}
      play
      className='w-1/2'
    />
        </div>
    </>
  )
}

export default PageNotFound