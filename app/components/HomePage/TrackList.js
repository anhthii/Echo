import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';

class TrackList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  downloadSong(criteria) {
    if (!this.props.authenticated) {
      return this.context.router.push('/login');
    }
    return this.props.download(criteria);
  }

  render() {
    return (
      <div className='hp-track-list-wrapper'>
        <ul className='hp-track-list'>
          { this.props.tracks.map(track =>
            <Track
              key={track.id}
              {...track}
              {...this.props}
              download={this.downloadSong.bind(this)}
            />)
          }
          { this.props.isLoading && <div className='loader'></div> }
        </ul>
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
};

export default TrackList;

