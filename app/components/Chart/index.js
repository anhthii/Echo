import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";
import { haveDropDown } from "../../HOC";
import LinksByComma from "../LinksByComma";
import WithBackgroundImage from "../WithBgImg";
import "./index.sass";

const Chart = props => {
  const { chart } = props;
  if (!chart.items) {
    return null;
  }

  return (
    <div className="chart">
      <WithBackgroundImage className="featured-image" src={chart.cover} />
      <ul className="chart-list">
        {chart.items.map((item, index) => {
          if (index === 0) {
            return (
              <ChartFirstItem key={`chart-${item.encodeId}`} id={item.encodeId} name={item.title} {...item} {...props} />
            );
          }
          return <ChartItem key={`chart-${item.encodeId}`} id={item.encodeId} name={item.title} {...item} {...props} />;
        })}
      </ul>
    </div>
  );
};

Chart.propTypes = {
  renderDropDown: PropTypes.func.isRequired
};

const ChartFirstItem = ({
  title,
  order,
  id,
  artists,
  alias,
  name,
  thumbnail,
  renderDropDown,
  toggleTrackDropDown,
  streamingStatus
}) => (
  <li className="chart-item">
    <div className="chart-item-order order-first chart-item-thumb">
      <img src={thumbnail} />
    </div>
    <div className="chart-item-detail detail-first">
      <div className="chart-item-detail-left">
        <div className="chart-item-order">
          {streamingStatus == 2 ? (
            <span className="vip-required">Vip</span>
          ) : null}
        </div>
        <div className="chart-item-title ellipsis" title={title}>
          <Link
            to={`/song/${alias}/${id}`}
            onClick={e => {
              if (streamingStatus == 2) {
                e.preventDefault();
                alert("only vip users can see this");
              }
            }}
          >
            {title}
          </Link>
        </div>
        <LinksByComma
          className="chart-item-artist ellipsis"
          data={artists}
          definePath={url => url.replace("nghe-si", "artist")}
          defineTitle={title =>
            title.replace("Nhiều nghệ sĩ", "Various artists")
          }
          pathEntry="link"
          titleEntry="name"
        />
      </div>
      <div className="chart-item-detail-right">
        <button className="sc-ir">
          <i className="ion-android-download" title="download the track"></i>
        </button>
        <button
          className="sc-ir ignore-react-onclickoutside"
          onClick={() => toggleTrackDropDown(id, "Chart")}
        >
          <i className="ion-more"></i>
        </button>
      </div>
    </div>
    {renderDropDown("Chart", { name, id, artists, thumbnail })}
  </li>
);

ChartFirstItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired
};

const ChartItem = ({
  title,
  order,
  id,
  name,
  alias,
  thumbnail,
  artists,
  renderDropDown,
  toggleTrackDropDown,
  streamingStatus
}) => (
  <li className="chart-item">
    <div className="chart-item-thumb">
      <img src={thumbnail} />
    </div>
    <div className="chart-item-detail">
      <div className="chart-item-detail-left">
        <div className="chart-item-order">
          {streamingStatus == 2 ? (
            <span className="vip-required">Vip</span>
          ) : null}
        </div>
        <div className="chart-item-info">
          <div className="chart-item-title ellipsis" title={title}>
            <Link
              to={`/song/${alias}/${id}`}
              onClick={e => {
                if (streamingStatus == 2) {
                  e.preventDefault();
                  alert("only vip users can see this");
                }
              }}
            >
              {title}
            </Link>
          </div>
          <LinksByComma
            className="chart-item-artist ellipsis"
            data={artists}
            pathEntry="link"
            titleEntry="name"
            definePath={url => url.replace("nghe-si", "artist")}
            defineTitle={title =>
              title.replace("Nhiều nghệ sĩ", "Various artists")
            }
          />
        </div>
      </div>
      <div className="chart-item-detail-right">
        <button className="sc-ir">
          <i className="ion-android-download" title="download the track"></i>
        </button>
        <button
          className="sc-ir ignore-react-onclickoutside"
          onClick={() => toggleTrackDropDown(id, "Chart")}
        >
          <i className="ion-more"></i>
        </button>
      </div>
    </div>
    {renderDropDown("Chart", { name, id, artists, thumbnail })}
  </li>
);

ChartItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired
};

export default haveDropDown(Chart);
