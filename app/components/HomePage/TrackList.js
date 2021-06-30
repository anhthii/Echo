import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import { haveDropDown } from '../../HOC';

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
    const { isFading } = this.props;
    console.log(this.props);
    return (
      <div className='hp-track-list-wrapper'>
        <ul className={`hp-track-list ${isFading ? 'isFading' : ''}`}>
          { this.props.tracks.map((track,index) =>
            <Track
              key={track.encodeId}
              order={index + 1}
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
  isFading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  renderDropDown: PropTypes.func.isRequired,
};

export default haveDropDown(TrackList);

