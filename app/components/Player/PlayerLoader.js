import React from 'react';

const componentName = () => (
  <div className='player-loading'>
    <div className="player-overlay" />
    <div className='player-loader'>
      <img src='/svg/bars.svg' alt=""/><span style={{ color: '#BFC9CA' }}>Loading...</span>
    </div>
  </div>
);


export default componentName;