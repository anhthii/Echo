import PropTypes from "prop-types";
import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { Link } from "react-router";
import LazyloadImage from "../LazyloadImage";
import LinksByComma from "../LinksByComma";

const RenderButton = ({ alias, id, download, streaming_status }) => {
  if (streaming_status == 2) {
    return null;
  }
  return (
    <button
      className="sc-ir"
      onClick={() =>
        download({
          songName: alias,
          id
        })
      }
    >
      <i className="ion-android-download" title="download the track" />
    </button>
  );
};
const Track = props => {
  const {
    name,
    thumbnail,
    order,
    id,
    title,
    artists,
    alias,
    downloadProgress,
    streaming_status
  } = props;

  return (
    <li>
      {console.log("track", props)}
      {props.renderDropDown("Track", { id, name, thumbnail, artists })}
      <div className="trackPosition">{order}</div>
      <LazyloadImage src={thumbnail} className="track-thumb image-wrapper" />
      <div className="trackDetail">
        <div className="trackTitle">
          <Link
            to={`song/${name}/${id}`}
            onClick={e => {
              if (streaming_status == 2) {
                e.preventDefault();
                alert("only vip users can see this");
              }
            }}
          >
            {title}
          </Link>
          {streaming_status == 2 ? (
            <span className="vip-required">Vip</span>
          ) : null}
        </div>
        <LinksByComma
          className="trackArtist"
          data={artists}
          titleEntry="name"
          pathEntry="link"
          definePath={link => link.replace("/nghe-si/", "/artist/")}
          defineTitle={title =>
            title.replace("Nhiều nghệ sĩ", "Various artists")
          }
        />
      </div>
      <div className="trackActions">
        <div className="hp-track-toolbar">
          {downloadProgress.isDownloading === true &&
          id === downloadProgress.id ? (
            <CircularProgressbar percentage={downloadProgress.percent} />
          ) : (
            <RenderButton {...props} />
          )}
          <button className="sc-ir">
            <i className="ion-android-share" title="share" />
          </button>
          <button
            className="sc-ir ignore-react-onclickoutside"
            onClick={props.toggleTrackDropDown.bind(null, id, "Track")}
          >
            <i className="ion-more" />
          </button>
        </div>
      </div>
    </li>
  );
};

Track.propTypes = {
  renderDropDown: PropTypes.func.isRequired
};

export default Track;
