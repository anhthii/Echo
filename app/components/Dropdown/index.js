import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import queueAdd from '../../svg/queue-add.svg';
import queueNext from '../../svg/queue-next.svg';
import './index.sass';

class DropDown extends React.Component {

  handleClickOutside = () => {
    const { id, toggleTrackDropDown } = this.props;
    toggleTrackDropDown(id);
  }

  render() {
    const { name, id, thumbnail, addSongToQueue, toggleTrackDropDown } = this.props;
    const songObj = { name, id, thumbnail };
    return (
      <div className='dropdown'>
        <div className="dropdown-nextup" onClick={() => {
          addSongToQueue(songObj);
          toggleTrackDropDown(id);
        }}>
          <img src={queueAdd} alt=""/>
          Add to next up
        </div>
        <div className="dropdown-add">
          <img src={queueNext} style={{ height: '30px', width: '30px', marginRight: '5px' }} alt=""/>
          Add to playlist
        </div>
        <div className="dropdown-share">
          <i className="ion-android-share-alt"></i>
          Share
        </div>
      </div>
    );
  }
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  addSongToQueue: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired,
};

export default onClickOutside(DropDown);