import React from 'react'
import './LoadingScreen.css'


function LoadingScreen() {
    return (
      <div className="loading-screen">
        <div className="loader">
          <img src="https://i.pinimg.com/originals/38/11/24/381124ab06027e3a5bb9548118784e38.gif" alt="Loading..." />
        </div>
      </div>
    );
  }

export default LoadingScreen