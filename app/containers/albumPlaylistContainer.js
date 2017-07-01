import React from 'react';
import { connect } from 'react-redux';
import { AlbumPlaylist } from '../components';
import { fetchAlbumPlaylist } from '../actions/album';

class AlbumPlaylistContainer extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.params;
    this.props.fetchAlbumPlaylist(title, id);
  }

  render() {
    return (
      <AlbumPlaylist playlist={this.props.playlist} />
    );
  }
}

function mapStateToProps(state) {
  const playlist = state.albumState.playlist;

  return { playlist };
}

export default connect(mapStateToProps, { fetchAlbumPlaylist })(AlbumPlaylistContainer);
