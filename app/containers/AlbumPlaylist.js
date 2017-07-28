import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isEmpty } from '../utils/func';
import { fetchAlbumPlaylist, clearPlaylist } from '../actions/album';
import { replaceQueue } from '../actions/queue';

class AlbumPlaylist extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.params;

    if (!isEmpty(this.props.playlist)) {
      // Clear the the previous playlist data in the store
      this.props.clearPlaylist();
    }

    this.props.fetchAlbumPlaylist(title, id);
  }

  render() {
    return (
      <Pages.AlbumPlaylist
        playlist={this.props.playlist}
        replaceQueue={this.props.replaceQueue}
        isPlaying={this.props.isPlaying}
      />
    );
  }
}

function mapStateToProps(state) {
  const playlist = state.albumState.playlist;
  const isPlaying = !isEmpty(state.songData.data);
  return { playlist, isPlaying };
}

export default connect(mapStateToProps,
{ fetchAlbumPlaylist, clearPlaylist, replaceQueue })(AlbumPlaylist);
