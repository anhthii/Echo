import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtist, clearArtist } from '../actions/artist';
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
    if (nextProps.params.artistName !== this.props.params.artistName) {

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
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cover, avatar, artistName, song: { songs, numberOfPages } } = state.artistState.artist;
  return {
    cover,
    avatar,
    songs,
    numberOfPages,
    artistName,
  };
}

export default connect(mapStateToProps, { fetchArtist, clearArtist })(ArtistPage);