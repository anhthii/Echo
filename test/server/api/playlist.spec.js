import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { serial as test } from 'ava';
import Playlist from '../../../server/models/user_playlist';
import Database from '../../../server/lib/Database';
import routes from '../../../server/app';

process.env.NODE_ENV = 'production'; // test the production api version

let app;

test.before(async () => {
  await Database.init();
  await Playlist.remove({});
  app = express();
  app.use(bodyParser.json());
  routes(app);
});

test.after.always('clean up the database', async () => {
  await Playlist.remove({});
});


test('should initialize an empty playlist collection', async t => {
  t.plan(3);
  const res = await request(app)
    .post('/api/playlist')
    .send({ username: 'zayn' });

  t.is(res.status, 200);
  t.is(res.body._username, 'zayn');
  t.deepEqual(res.body.playlists, []);
});

test('should not initialize a playlist collection if the user already created one', async t => {
  t.plan(2);
  const res = await request(app)
    .post('/api/playlist')
    .send({ username: 'zayn' });
  t.is(res.status, 400);
  t.is(res.text, 'zayn playlist collection already exists');
});

test('should get user playlist collection', async t => {
  t.plan(2);
  const res = await request(app).get('/api/playlist/zayn');
  t.is(res.status, 200);
  t.true(Array.isArray(res.body));
});

test('should create a playlist', async t => {
  t.plan(2);
  const res = await request(app)
    .post('/api/playlist/zayn')
    .send({ title: 'rap' });
  t.is(res.status, 200);
  const newplaylist = res.body.playlists.find(playlist => playlist.title === 'rap');
  if (newplaylist) { t.pass(); }
});

test('should not create a playlist', async t => {
  t.plan(2);
  const res = await request(app)
    .post('/api/playlist/zayn')
    .send({ title: 'rap' });
  t.is(res.status, 400);
  t.is(res.text, 'rap playlist already exists');
});

test('should add a song to a playlist', async t => {
  t.plan(2);
  const song = {
    id: '123456',
    title: 'See you again',
    artists: 'Charlie Puth - Wiz Khalifa',
  };

  const res = await request(app)
    .put('/api/playlist/zayn/rap')
    .send(song);
  t.is(res.status, 200);
  const playlist = res.body.playlists.find(playlist => playlist.title === 'rap');
  t.deepEqual(playlist.songs[0], song);
});

test('shoud get a playlist', async t => {
  t.plan(2);
  const res = await request(app).get('/api/playlist/zayn/rap');
  t.is(res.status, 200);
  t.is(res.body.playlists.length, 1);
});

test('should not add a song to a playlist', async t => {
  t.plan(2);
  const song = {
    id: '123456',
    title: 'See you again',
    artists: 'Charlie Puth - Wiz Khalifa',
  };

  const res = await request(app)
    .put('/api/playlist/zayn/rap')
    .send(song);
  t.is(res.status, 400);
  t.is(res.text, `${song.title} songs already exists in rap playlist`);
});

test('should delete a song from a playlist', async t => {
  const res = await request(app)
    .delete('/api/playlist/zayn/rap/123456');
  t.is(res.status, 200);
  const playlist = res.body.playlists.find(playlist => playlist.title === 'rap');
  const song = playlist.songs.find(song => song.id === '123456');
  t.is(song, undefined);
});
