import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import WithBackgroundImage from '../WithBgImg';
import './index.sass';

const Chart = ({ chart }) => {
  if (!chart.items) {
    return null;
  }

  return (
    <div className="chart">
      <WithBackgroundImage className="featured-image" src={chart.cover} />
      <ul className="chart-list">
        {
          chart.items.map((item, index) => {
            if (index === 0) {
              return <ChartFirstItem key={`chart-${item.id}`} {...item} />;
            }
            return <ChartItem key={`chart-${item.id}`} {...item} />;
          })
        }
      </ul>
    </div>
  );
};

const ChartFirstItem = ({ name, order, id }) => (
  <li className="chart-item">
    <div className="chart-item-order order-first">
      { order }
    </div>
    <div className="chart-item-detail detail-first">
      <div className="chart-item-detail-left">
        <div className="chart-item-title ellipsis" title={name}>
          <Link to={`/song/${changeAlias(name)}/${id}`}>{name}</Link>
        </div>
        <div className="chart-item-artist">
          <Link to='/'>We loved</Link>
        </div>
      </div>
      <div className="chart-item-detail-right">
        <button className="sc-ir"><i className="ion-android-download" title="download the track"></i></button>
        <button className="sc-ir"><i className="ion-more"></i></button>
      </div>
    </div>
  </li>
);

const ChartItem = ({ name, order, id, thumbnail }) => (
  <li className="chart-item">
    <div className="chart-item-thumb">
      <img src={thumbnail} />
    </div>
    <div className="chart-item-detail">
      <div className="chart-item-detail-left">
        <div className="chart-item-order">{order}</div>
        <div className="chart-item-info">
          <div className="chart-item-title ellipsis" title={name}>
            <Link to={`/song/${changeAlias(name)}/${id}`}>{name}</Link>
          </div>
          <div className="chart-item-artist">
            <Link to='/'>We loved</Link>
          </div>
        </div>
      </div>
      <div className="chart-item-detail-right">
        <button className="sc-ir"><i className="ion-android-download" title="download the track"></i></button>
        <button className="sc-ir"><i className="ion-more"></i></button>
      </div>
    </div>
  </li>
);

export default Chart;