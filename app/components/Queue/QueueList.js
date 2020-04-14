import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router";
import { getSongUrl } from "../../utils/func";
import LazyloadImage from "../LazyloadImage";

const Li = ({
  name,
  id,
  thumbnail,
  alias,
  artist,
  artists,
  removeSongFromQueue
}) => {
  return (
    <li>
      <LazyloadImage
        src={thumbnail || "http://zmp3-photo-td.zadn.vn/noimagex"}
        className="queue-list-thumb"
      />
      <div className="queue-list-info">
        <div className="queue-track-title ellipsis" title={name}>
          <Link to={getSongUrl(alias || name, id)}>{name}</Link>
        </div>
        <div className="queue-track-artist ellipsis">
          {artist ||
            (artists &&
              (Array.isArray(artists)
                ? artists.map(artist => artist.name).join(", ")
                : artists))}
        </div>
      </div>
      <div className="queue-track-actions">
        <i className="ion-android-download"></i>
        <i className="ion-trash-b" onClick={() => removeSongFromQueue(id)}></i>
      </div>
    </li>
  );
};

export default function QueueList({ songs, removeSongFromQueue }) {
  return (
    <ul className="queue-list">
      <ReactCSSTransitionGroup
        transitionName="queue-item"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {songs.map(song => (
          <Li
            key={`queue-${song.id}`}
            {...song}
            removeSongFromQueue={removeSongFromQueue}
          />
        ))}
      </ReactCSSTransitionGroup>
    </ul>
  );
}
