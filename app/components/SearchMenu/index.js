import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopResult from './TopResult';
import SongResult from './SongResult';
import AlbumResult from './AlbumResult';
import ArtistResult from './ArtistResult';
import './index.sass';

class SearchMenu extends Component {
  render() {
    const { top, data } = this.props.searchResult;
    if (!data) return null;
    return (
      <ul className='search-menu'>
        { top && <TopResult {...top} clearSearchResult={this.props.clearSearchResult}/> }
        <SongResult songs={data.song || []} />
        <ArtistResult artists={data.artist} />
        <AlbumResult albums={data.album} />
      </ul>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.object.isRequired,
  clearSearchResult: PropTypes.func.isRequired,
};

export default SearchMenu;