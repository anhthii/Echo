import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as Containers from './containers';
import { NotFound } from './components';
import { fetchDefaultTracks, getCharts } from './route_callbacks';

export default (
  <Route path='/' component= {Containers.App}>
    <IndexRoute component={Containers.HomePage} onEnter={fetchDefaultTracks} />
    <Route path='song/:name/:id' component={Containers.SongPage} />
    <Route path='album/playlist/:title/:id' component={Containers.AlbumPlaylist}/>
    <Route path='albums(/:genre)(/:id)' component={Containers.AlbumGenrePage} />
    <Route path='artists(/:genre)(/:id)' component={Containers.ArtistGenrePage} />
    <Route path='artist/:name' component={Containers.ArtistPage} />
    <Route path='charts' component={Containers.ChartPage} onEnter={getCharts} />
    <Route path="*" component={NotFound} />
  </Route>
);
