import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

const datas = {
  'IWZ9Z097': 'Popular songs',
  'IWZ9Z08W': 'Popular Korean songs',
  'IWZ9Z088': 'Popular Vietnamese songs',
};

class Choices extends Component {
  state = { showMenu: false, activeId: 'IWZ9Z097' };

  handleClickOutside = () => {
    this.setState({ showMenu: false });
  }

  toggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  handleOnClick(id) {
    if (id === this.state.activeId) {
      return;
    }

    this.props.fetchTracks(0, id);
    this.setState({ activeId: id });
  }

  render() {
    return (
      <div
        className={`choice ${this.state.showMenu ? 'choice-active' : null}`}
        onClick={this.toggle.bind(this)}
      >
        Popular songs
        <i className="ion-chevron-down"></i>
        {
          this.state.showMenu &&
          <ul className="choice-list">
            {
              Object.keys(datas).map(key =>
                <li key={key} onClick={this.handleOnClick.bind(this, key)}>{datas[key]}</li>
              )
            }
          </ul>
        }
      </div>
    );
  }
}

Choices.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
};

export default onClickOutside(Choices);
