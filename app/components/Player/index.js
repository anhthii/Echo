import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { Link, browserHistory } from 'react-router';
import PlayerLoader from './PlayerLoader';
import initAnalyzer from '../../utils/initAnalyzer';
import { changeAlias, getSongUrl, isTwoObjectEqual, formatTime } from '../../utils/func';

import './index.sass';


class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      isSeeking: false,
      isPlaying: false,
      audioState: 0,
      loop: false,
    };
  }

  componentDidMount() {
    this.audio = this.refs.audio;

    this.audio.addEventListener('loadeddata', () => {
      if (this.audio.readyState >= 2) {
        this.audio.play();
      }
      this.setState({ audioState: this.audio.readyState });
    });

    this.audio.onplay = () => {
      this.timer = setInterval(() => this.updateProgress(this.audio), 50);
      this.setState({ isPlaying: true });
    };

    this.audio.onended = () => this.playPrevOrNextSong('next');

    this.audio.onpause = () => {
      clearInterval(this.timer);
      this.setState({ isPlaying: false });
    };

    // initialize the audio analyzer
    initAnalyzer(this.audio);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isPlaying !== this.state.isPlaying) {
      if (nextState.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }

    if (!isTwoObjectEqual(nextProps.queueIds, this.props.queueIds) &&
      !nextProps.queueIds.includes(this.props.songData.id) &&
      nextProps.queue[0]
      ) {
      const { name, id } = nextProps.queue[0];
      this.props.fetchSong(changeAlias(name), id); // changeAlias {func}: escape ut8 character
      this.props.fetchSuggestedSongs(id);
      if (/\/song\//.test(window.location.href)) {
        // only redirect if is on the song route
        browserHistory.push(`/song/${changeAlias(name)}/${id}`);
      }
    }

    const nextPercent = nextProps.playerState.playedPercent;
    const currentPercent = this.props.playerState.playedPercent;

    if (nextPercent != currentPercent  && nextPercent) {
      this.audio.currentTime = this.audio.duration * nextPercent / 100;
    }
  }

  findSong(prevOrnext) {
    const queue = this.props.queue;
    const currId = this.props.songData.id;
    let index;

    for (let i = 0, length = queue.length; i < length; i++) {
      if (queue[i].id === currId) {
        switch (prevOrnext) {
        case 'next':
          index = i === length - 1 ? 0 : i + 1;
          // replay the queue if the index is equal the queue length otherwise play the next song
          break;
        case 'prev':
          index = i === 0 ? length - 1 : i - 1;
          // play the last song in the queue if the index is 0 otherwise play the prev song
          break;
        default:
          return null;
        }
        return queue[index];
      }
    }

    return undefined;
  }

  playPrevOrNextSong(prevOrnext) {
    const prevOrnextSong = this.findSong(prevOrnext);

    if (!prevOrnextSong) return;

    const { name, alias, id } = prevOrnextSong;

    this.props.togglePushRoute(true); // enable .push for browserHistory

    if (alias) {
      this.props.fetchSong(alias, id);
    } else {
      this.props.fetchSong(changeAlias(name), id); // changeAlias {func}: escape ut8 character
    }

    this.props.fetchSuggestedSongs(id);
  }

  togglePlayBtn() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  updateProgress(audio) {
    const lyric = this.props.songData.lyric;

    // update progress bar
    let val = 0;
    if (audio.currentTime > 0) {
      val = (audio.currentTime / audio.duration * 100).toFixed(2);
    }
    if (!this.state.isSeeking) {
      this.setState({ progress: val });
    }

    if (!lyric.length) return;

    const {
      playerState: { lyric1, lyric2 },
      updateLyricPercent,
      updateLyric,
    } = this.props;


    if (audio.currentTime > lyric[lyric.length - 1].end || audio.currentTime) {

      // clear lyric when the audio is playing with beat only
      updateLyric([], []);
    }

    for (let i = 0; i < lyric.length; i++) {
      if (i < lyric.length - 1 &&
        i % 2 == 0 &&
        audio.currentTime >= lyric[i].start &&
        audio.currentTime <= lyric[i + 1].end) {
        updateLyric(lyric[i], lyric[i + 1]);
      }
    }

    if (audio.currentTime <= lyric1.end) {
      let width = (audio.currentTime - lyric1.start) / (lyric1.end - lyric1.start) * 100;
      width = Math.ceil(width);
      updateLyricPercent(width, 0);
    } else if (audio.currentTime <= lyric2.end) {
      updateLyricPercent(null, 0);
      let width = (audio.currentTime - lyric2.start) / (lyric2.end - lyric2.start) * 100;
      width = Math.ceil(width);
      width = width <=  0 ? 0 : (width > 96 ? 100 : width); // fill the karaoke text
      updateLyricPercent(100, width);
    }
  }

  handleChange(value) {
    this.setState({ progress: value, isSeeking: true });
  }

  handleChangeComplete(value) {
    if (value == 100) {
      this.props.updateLyric([], []);
    }

    this.audio.play();

    if (this.audio.duration) {
      this.audio.currentTime = (value / 100) * this.audio.duration;
    }

    this.setState({ isSeeking: false });
  }

  render() {
    const { songData, queue } = this.props;
    const { name, id } = songData;
    const artists = songData.artist.split(/\s*,\s*/);

    return (
      <div className='player'>
        <audio
          autoPlay
          src={songData.source_list && songData.source_list[0]}
          crossOrigin='anonymous'
          ref='audio'
          loop={this.state.loop}
        />
        <div className="player-info">
          <Link
            to={getSongUrl(name, id)}
            className='ellipsis'
            title={songData.name}
          >{songData.name}
          </Link>
          <Link
            to={`/artist/${changeAlias(artists[0])}`}
            className='ellipsis'
            title={songData.artist}
          >{songData.artist}
          </Link>
        </div>
        <div className="player-btns">
          <button
            className='sc-ir player-btn'
            onClick={this.playPrevOrNextSong.bind(this, 'prev')}
          >
            <i className="ion-ios-rewind"></i>
          </button>
          <button
            className='sc-ir player-btn'
            onClick={this.togglePlayBtn.bind(this)}
          >
            <i className={`ion-${this.state.isPlaying ? 'pause' : 'play'}`}></i>
          </button>
          <button
            className='sc-ir player-btn'
            onClick={this.playPrevOrNextSong.bind(this, 'next')}
          >
            <i className="ion-ios-fastforward"></i>
          </button>
          <button
            className='sc-ir player-btn queue-btn'
            onClick={this.props.toggleQueue}
          >
            <span className="queue-circle">{queue.length}</span>
            <img src='/svg/playlist.svg' />
          </button>
        </div>
        <div className="player-seek">
          <span>{(this.audio && this.audio.duration) ? '0:00' : ''}</span>
          <InputRange
            maxValue={100}
            minValue={0}
            value={parseInt(this.state.progress, 10)}
            onChange={this.handleChange.bind(this)}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
          <span>
            { this.audio &&
              (!isNaN(this.audio.duration) && formatTime(this.audio.duration))
            }
          </span>
        </div>
        <div className="player-other">
          <button className="sc-ir" title="Loop">
            <i
              className="ion-loop"
              style={{ color: this.state.loop ? '#23B89A' : '#adb5bd' }}
              onClick={() => this.setState({ loop: !this.state.loop })}
            ></i>
          </button>
        </div>
        { this.props.isFetching && <PlayerLoader /> }
      </div>
    );
  }
}

Player.propTypes = {
  playerState: PropTypes.object.isRequired,
  updateLyric: PropTypes.func.isRequired,
  updateLyricPercent: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
  fetchSong: PropTypes.func.isRequired,
  queue: PropTypes.array.isRequired,
  queueIds: PropTypes.array,
  toggleQueue: PropTypes.func.isRequired,
  togglePushRoute: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Player;
