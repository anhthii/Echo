import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isTwoObjectEqual } from '../utils/func';
import {
  fetchDefaultAlbums,
  fetchAlbums,
  chagePageChunkIndex,
} from '../actions/album';

class AlbumGenrePage extends Component {
  componentDidMount() {
    const { id, title } = this.props.params;
    if (id && title) {
      this.props.fetchAlbums(title, id);
    } else {
      this.props.fetchDefaultAlbums();
    }
  }

  componentWillReceiveProps(nextProps) {
    // fetch default albums if the user navigate to the index album route

    if (nextProps.location.pathname !== this.props.location.pathname &&
      /album$/.test(nextProps.location.pathname)) {
      this.props.fetchDefaultAlbums();
      return;
    }

    const nextPage = nextProps.location.query.page;
    const currPage = this.props.location.query.page;

    // fetch new albums if the album route genre changes

    if (!isTwoObjectEqual(nextProps.params, this.props.params)) {
      const { id, title } = nextProps.params;
      this.props.fetchAlbums(title, id);
      this.props.chagePageChunkIndex(0);
    }

    // fetch new albums if the current album route is appended with the `?page=` query

    if (nextPage && nextPage !== currPage) {
      const { id, title } = this.props.params;
      this.props.fetchAlbums(title, id, nextPage);
      return;
    }
  }

  render() {
    return (
      <Pages.AlbumGenrePage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return state.albumState;
}

export default connect(mapStateToProps,
  { chagePageChunkIndex, fetchAlbums, fetchDefaultAlbums }
)(AlbumGenrePage);
