import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtist, clearArtist, changePageChunkIndex } from '../actions/artist';
import { Pages } from '../components';

class ArtistPage extends Component {
  componentDidMount() {
    const { artistName } = this.props; // check if there is already artist data or not
    if (!artistName || this.props.artistName !== this.props.params.name) {
      // clear the previous artist data
      if (this.props.artistName) {
        this.props.clearArtist();
      }

      this.props.fetchArtist(this.props.params.name);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.name !== this.props.params.name) {
      this.props.clearArtist();
      this.props.fetchArtist(nextProps.params.name);
    }

    const nextPage = nextProps.location.query.page;
    const currPage = this.props.location.query.page;

    if (nextPage && nextPage !== currPage) {
      this.props.fetchArtist(this.props.params.name, 'songs', nextPage);
    }
  }

  render() {
    const { cover, avatar, songs, numberOfPages, artistName } = this.props;

    return (
      <div>
        <Pages.ArtistPage
          cover={cover}
          avatar={avatar}
          songs={songs}
          numberOfPages={numberOfPages}
          artistName={artistName}
          pageChunkIndex={this.props.pageChunkIndex}
          pageChunks={this.props.pageChunks}
          changePageChunkIndex={this.props.changePageChunkIndex}
          page={this.props.location.query.page}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cover,
    avatar,
    artistName,
    song: { songs, numberOfPages } } = state.artistState.artist;

  const { pageChunkIndex, pageChunks } = state.artistState;

  return {
    cover,
    avatar,
    songs,
    numberOfPages,
    artistName,
    pageChunks,
    pageChunkIndex,
  };
}

export default connect(mapStateToProps,
{ fetchArtist, clearArtist, changePageChunkIndex })(ArtistPage);
