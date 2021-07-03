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
    const {data} = this.props.searchResult;
    if (!data) return null;
    console.log("search menu");
    console.log(data);
    return (
      <ul className='search-menu'>
        { data.top && <TopResult {...data.top} clearSearchResult={this.props.clearSearchResult}/> }
        <SongResult songs={data.songs || []} clearSearchResult={this.props.clearSearchResult} />
        <ArtistResult artists={data.artists || []} clearSearchResult={this.props.clearSearchResult} />
        <AlbumResult albums={data.playlists || []} clearSearchResult={this.props.clearSearchResult} />
      </ul>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.object.isRequired,
  clearSearchResult: PropTypes.func.isRequired
};

export default onClickOutside(SearchMenu);
