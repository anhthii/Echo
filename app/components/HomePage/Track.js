import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import { toggleTrackDropDown } from '../../actions/ui';
import Dropdown from '../Dropdown';
import LazyloadImage from '../LazyloadImage';
import { addSongToQueue } from '../../actions/queue';

class Track extends React.Component {
  render() {
    const { name,
      thumbnail,
      order,
      id,
      show,
      dropDownActiveId,
      addSongToQueue,
      toggleTrackDropDown,
    } = this.props;

    return (
      <li>
        <div className="trackPosition">
          {order}
        </div>
        <LazyloadImage src={thumbnail} className='track-thumb image-wrapper' />
        <div className="trackDetail">
          <div className="trackTitle">
            <Link
              to={`song/${changeAlias(name)}/${id}`}

            >{name}</Link>
          </div>
          <div className="trackArtist">
            <a href='#' className=''>Justin Bieber</a>
          </div>
        </div>
        <div className="trackActions">
          <div className="hp-track-toolbar">
            <button className='sc-ir'><i className="ion-android-download" title="download the track" /></button>
            <button className='sc-ir'><i className="ion-android-share" title="share" /></button>
            <button
              className='sc-ir ignore-react-onclickoutside'
              onClick={this.props.toggleTrackDropDown.bind(null, id)}>
              <i className="ion-more" />
            </button>
          </div>
        </div>
        { show && id === dropDownActiveId &&
          <Dropdown
            name={name}
            id={id}
            thumbnail={thumbnail}
            addSongToQueue={addSongToQueue}
            toggleTrackDropDown={toggleTrackDropDown}
          />
        }
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.UIState.dropDown.show,
    dropDownActiveId: state.UIState.dropDown.activeId,
  };
}

export default connect(mapStateToProps,
{ toggleTrackDropDown, addSongToQueue })(Track);
