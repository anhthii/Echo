import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Karaoke as KarokeContainer } from './';
import { Pages } from '../components';
import { fetchSong, fetchSuggestedSongs } from '../actions/song';
import { showAnalyzer } from '../actions/ui';
import { getSongUrl, isEmpty } from '../utils/func';

const fetch = (ctx, name, id) => {
  ctx.props.fetchSong(name, id);
  ctx.props.fetchSuggestedSongs(id);
};

class SongPage extends React.Component {
  componentDidMount() {
    this.props.showAnalyzer();

    const { name, id } = this.props.params;
    // only fetch new song data when the user enter the url directly into the url bar on the browser
    // or the url params.id is different from the playing song id

    if (isEmpty(this.props.songData) || id !== this.props.songData.id) {
      fetch(this, name, id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { routing: { locationBeforeTransitions: currLoc } } = this.props;
    const { routing: { locationBeforeTransitions: nextLoc } } = nextProps;
    const { id: nextId, name } = nextProps.songData;




    if (nextProps.canPushRoute && nextId !== this.props.songData.id) {
      browserHistory.push(getSongUrl(name, nextId));
      return;
    }

    if (((!currLoc && nextLoc) ||
      (currLoc && nextLoc && currLoc.pathname !== nextLoc.pathname)) &&
      /song\/.+/.test(nextLoc.pathname)) {
      if (this.props.params.id !== nextId) {
        return;
      }

      const { name, id } = nextProps.params;
      fetch(this, name, id);
    }
  }

  render() {
    return (
      <div>
        <KarokeContainer className='karaoke-song-page'/>
        <Pages.SongPageBody suggestedSongs={this.props.suggestedSongs}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestedSongs: state.songData.suggestedSongs,
    songData: state.songData.data,
    routing: state.routing,
    canPushRoute: state.queueState.pushRoute,
  };
}

export default connect(mapStateToProps,
{ fetchSong, showAnalyzer, fetchSuggestedSongs })(SongPage);

