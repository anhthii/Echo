import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import TopResult from './TopResult';
import SongResult from './SongResult';
import AlbumResult from './AlbumResult';
import ArtistResult from './ArtistResult';
import './index.sass';

class SearchMenu extends Component {
  handleClickOutside = () => {
    this.props.clearSearchResult();
  }

  render() {
    const { top, data } = this.props.searchResult;
    if (!data) return null;
    return (
      <ul className='search-menu'>
        { top && <TopResult {...top} clearSearchResult={this.props.clearSearchResult}/> }
        <SongResult songs={data.song || []} clearSearchResult={this.props.clearSearchResult} />
        <ArtistResult artists={data.artist || []} clearSearchResult={this.props.clearSearchResult} />
        <AlbumResult albums={data.album || []} clearSearchResult={this.props.clearSearchResult} />
      </ul>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.object.isRequired,
  clearSearchResult: PropTypes.func.isRequired,
};

export default onClickOutside(SearchMenu);
