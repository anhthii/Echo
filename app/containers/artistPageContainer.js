import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtist } from '../actions/artist';
import { ArtistPage } from '../components';

class ArtistPageContainer extends Component {
  componentDidMount() {
    const { cover, artistName } = this.props; // check if there is already artist data or not
    console.log('cool');
    if (!artistName || this.props.artistName !== this.props.params.name) {
      this.props.fetchArtist(this.props.params.name);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.params.artistName !== this.props.params.artistName) {
      console.log(this.props.params.artistName);
    }
  }

  render() {
    const { cover, avatar, songs, numberOfPages, artistName } = this.props;
    return (
      <div>
        <ArtistPage
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

export default connect(mapStateToProps, { fetchArtist })(ArtistPageContainer);