import React from 'react';
import KaraokeLyric from 'react-karaoke-lyric';
import PropTypes from 'prop-types';
import SeekBar from './seekbar';
import WithBackgroundImg from '../WithBgImg';
import './index.sass';

const propTypes = {
  playerState: PropTypes.object.isRequired,
  seekBarState: PropTypes.object.isRequired,
  updatePlayedPercent: PropTypes.func.isRequired,
  cover: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

function SongHeader(props) {
  const { isFetching } = props;
  const { per1, per2, lyric1, lyric2 } = props.playerState;

  return (
    <WithBackgroundImg className='songHeader' src={props.cover}>
      <div />
      {
        isFetching &&
        <div className='songHeader-loader'>
          <img src='/svg/three-dots.svg' />
        </div>
      }

      { !isFetching && (props.showInfo
        ? <div className="songHeader-info">
          <h2>{props.name}</h2>
          <h3>{props.artist}</h3>
        </div>
        : <div className='karaokeWrapper'>
          <KaraokeLyric
            text={lyric1.text || ''}
            percentage={per1 || 0}
            activeStyle={{ color: 'skyblue' }}
          />
          <br />
          <br />
          <KaraokeLyric
            text={lyric2.text || ''}
            percentage={per2 || 0}
            activeStyle={{ color: 'skyblue' }}
          />
        </div>
      )}
      <SeekBar
        seekBarState={props.seekBarState}
        updatePlayedPercent={props.updatePlayedPercent}
      />
    </WithBackgroundImg>
  );
}

SongHeader.propTypes = propTypes;

export default SongHeader;