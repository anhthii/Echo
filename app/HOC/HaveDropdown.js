import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTrackDropDown, toggleModal } from '../actions/ui';
import { addSongToStoreTemporarily } from '../actions/user_playlist';
import { addSongToQueue } from '../actions/queue';
import { Dropdown } from '../components';

export default function (ComposedComponent) {
  class HaveDropDown extends Component {
    renderDropDown(where, { id, name, thumbnail, artists }) {
      const { showDropdown, dropDownActiveId } = this.props;

      return showDropdown && id === dropDownActiveId && where === this.props.where &&
        <Dropdown
          name={name}
          id={id}
          thumbnail={thumbnail}
          addSongToQueue={this.props.addSongToQueue}
          toggleTrackDropDown={this.props.toggleTrackDropDown}
          toggleModal={this.props.toggleModal}
          artists={artists}
          addSongToStoreTemporarily={this.props.addSongToStoreTemporarily}
        />;
    }

    render() {
      return (
        <ComposedComponent {...this.props} renderDropDown={this.renderDropDown.bind(this)}/>
      );
    }
  }

  function mapStateToProps(state) {
    const { where, activeId, show } = state.UIState.dropDown;
    return {
      showDropdown: show,
      dropDownActiveId: activeId,
      where,
    };
  }

  HaveDropDown.propTypes = {
    showDropdown: PropTypes.bool.isRequired,
    dropDownActiveId: PropTypes.string,
    toggleTrackDropDown: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps,
    {
      toggleTrackDropDown,
      addSongToQueue,
      addSongToStoreTemporarily,
      toggleModal,
    })(HaveDropDown);
}
