import React from 'react';
import PropTypes from 'prop-types';
import QueueList from './QueueList';
import './index.sass';

function Queue({ songs, toggleQueue, clearQueue, removeSongFromQueue, show }) {
  return (
    <div className={`queue${show ? ' queue-visible' : ''}`}>
      <div className="queue-panel">
        <div className="queue-title">
          Next Up
        </div>
        <div className="queue-clear">
          <button onClick={clearQueue}>Clear</button>
        </div>
        <div className="queue-hide">
          <button className="sc-ir" onClick={toggleQueue}>Hide queue</button>
        </div>
      </div>
      <QueueList songs={songs} removeSongFromQueue={removeSongFromQueue}/>
    </div>
  );
}

Queue.propTypes = {
  songs: PropTypes.array.isRequired,
  toggleQueue: PropTypes.func.isRequired,
  removeSongFromQueue: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Queue;

