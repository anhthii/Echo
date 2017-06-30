import React from 'react';
import PropTypes from 'prop-types';
import QueueList from './QueueList';
import './index.sass';

function Queue({ songs, toggleQueue }) {
  return (
    <div className='queue'>
      <div className="queue-panel">
        <div className="queue-title">
          Next Up
        </div>
        <div className="queue-clear">
          <button>Clear</button>
        </div>
        <div className="queue-hide">
          <button className="sc-ir" onClick={toggleQueue}>Hide queue</button>
        </div>
      </div>
      <QueueList songs={songs}/>
    </div>
  );
}

Queue.propTypes = {
  songs: PropTypes.array.isRequired,
  toggleQueue: PropTypes.func.isRequired,
};

export default Queue;

