import React from 'react';
import MainView from '../../MainView';
import GenreMenu from '../../GenreMenu';
import ArtistCard from './ArtistCard';

const AlbumGenrePage = (props) => {
  return (
    <div>
      <GenreMenu type="artist"/>
      <MainView type="artist" chunkSize={5} {...props} Card={ArtistCard}/>
    </div>
  );
};

export default AlbumGenrePage;