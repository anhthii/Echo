import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDefaultArtists, fetchArtists, clearArtists } from '../actions/artist';
import { changePageChunkIndex } from '../actions/album';
import { Pages } from '../components';
import { isTwoObjectEqual } from '../utils/func';

class ArtistGenrePage extends Component {
  componentDidMount() {
    const { id, genre } = this.props.params;

    if (id && genre) {
      this.props.fetchArtists(genre, id);
    } else {
      this.props.clearArtists();
      this.props.fetchDefaultArtists();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname &&
      /artists$/.test(nextProps.location.pathname)) {
      this.props.clearArtists();
      this.props.fetchDefaultArtists();
      return;
    }

    const nextPage = nextProps.location.query.page;
    const currPage = this.props.location.query.page;

    // fetch new albums if the album route genre changes

    if (!isTwoObjectEqual(nextProps.params, this.props.params)) {
      const { id, genre } = nextProps.params;
      this.props.fetchArtists(genre, id);
      this.props.changePageChunkIndex(0);
    }

    // fetch new albums if the current album route is appended with the `?page=` query

    if (nextPage && nextPage !== currPage) {
      const { id, genre } = this.props.params;
      this.props.fetchArtists(genre, id, nextPage);
      return;
    }
  }

  render() {
    return (
      <Pages.ArtistGenrePage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return { ...state.artistState, isLoading: state.UIState.isLoading };
}

export default connect(mapStateToProps,
{ fetchDefaultArtists, fetchArtists, changePageChunkIndex, clearArtists })(ArtistGenrePage);
