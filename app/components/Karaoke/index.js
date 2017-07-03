import React from 'react';
import PropTypes from 'prop-types';
import KaraokeLyric from './KaraokeLyric';
import WithBackgroundImg from '../WithBgImg';
import './index.sass';

const KLyric = ({ text, per, fontSize }) =>
  <KaraokeLyric
    text={text || ''}
    percentage={per || 0}
    activeStyle={{ color: 'skyblue', ...fontSize && { fontSize } }}
    fontStyle={{ ...fontSize && { fontSize } }}
  />;

const Karaoke = (props) => {
  const { isFetching, fontSize } = props;
  const { per1, per2, lyric1, lyric2 } = props.playerState;

  return (
    <WithBackgroundImg className={`karaoke ${props.className}`} src={props.cover}>
      <div />
      {
        isFetching &&
        <div className='karaoke-loader'>
          <img src='/svg/three-dots.svg' />
        </div>
      }
      { !isFetching && (props.showInfo
        ? <div className="karaoke-info">
          <h2>{props.name}</h2>
          <h3>{props.artist}</h3>
        </div>
        : <div className='karaokeWrapper'>
          <KLyric {...{ fontSize, per: per1, text: lyric1.text }}/>
          <br />
          <br />
          <KLyric {...{ fontSize, per: per2, text: lyric2.text }}/>
        </div>
      )}
    </WithBackgroundImg>
  );
};

const propTypes = {
  playerState: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  className: PropTypes.string,
  fontSize: PropTypes.string,
};

Karaoke.propTypes = propTypes;

export default Karaoke;
