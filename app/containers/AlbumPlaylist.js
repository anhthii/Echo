import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { fetchAlbumPlaylist } from '../actions/album';

class AlbumPlaylist extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.params;
    this.props.fetchAlbumPlaylist(title, id);
  }

  render() {
    return (
      <Pages.AlbumPlaylist playlist={this.props.playlist} />
    );
  }
}

function mapStateToProps(state) {
  const playlist = state.albumState.playlist;

  return { playlist };
}

export default connect(mapStateToProps, { fetchAlbumPlaylist })(AlbumPlaylist);
