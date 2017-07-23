import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { serial as test } from 'ava';
import Playlist from '../../../server/models/user_playlist';
import Database from '../../../server/lib/Database';
import routes from '../../../server/app';

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
