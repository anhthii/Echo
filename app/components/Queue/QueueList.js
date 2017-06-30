import React from 'react';
import LazyloadImage from '../LazyloadImage';

const Li = ({ name, id, thumbnail, cover }) => (
  <li>
    <LazyloadImage
      src={thumbnail || 'http://zmp3-photo-td.zadn.vn/noimagex'}
      className="queue-list-thumb"
    />
    <div className="queue-list-info">
      <div className="queue-track-title ellipsis">
        <a href='#'>{name}</a>
      </div>
      <div className="queue-track-artist ellipsis">
        <a href='#'>artist</a>
      </div>
    </div>
    <div className="queue-track-actions">
      <i className="ion-trash-b"></i>
      <i className='ion-android-download'></i>
      <i className="ion-ios-heart"></i>
      <i className="ion-more"></i>
    </div>
  </li>
);

export default function QueueList({ songs }) {
  return (
    <ul className="queue-list">
      {songs.map(song => <Li key={`queue-${song.id}`} {...song}/>)}
    </ul>
  );
}