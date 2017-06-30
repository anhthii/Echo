import React from 'react';
import PropTypes from 'prop-types';
import { offsetLeft } from '../../utils/mouse';
import { isTwoObjectEqual } from '../../utils/func';

const propTypes = {
  seekBarState: PropTypes.object.isRequired,
  updatePlayedPercent: PropTypes.func.isRequired,
};

class SeekBar extends React.Component {
  constructor() {
    super();
    this.state = {
      seekPercent: 0,
      progressActiveWidth: 0,
      progressWidth: 100,
    };
  }

  handleMouseMove(e) {
    this.setState({ seekPercent: e.clientX - offsetLeft(e.currentTarget) });
  }

  handleMouseOut() {
    this.setState({ seekPercent: 0 });
  }

  handleClick(e) {
    const leftSpace = e.clientX - offsetLeft(e.currentTarget);
    const playedPpercent = leftSpace / e.currentTarget.offsetWidth * 100;
    this.props.updatePlayedPercent(playedPpercent);
    this.setState({ seekPercent: 0 });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.seekBarState.isFullFilled) {
      this.setState({
        progressActiveWidth: 100,
        progressWidth: 0,
      });
    }

    if (!isTwoObjectEqual(nextProps.seekBarState, this.props.seekBarState)) {
      const { songDuration, songCurrentTime } = nextProps.seekBarState;
      const progressActiveWidth = songCurrentTime / songDuration * 100;
      const progressWidth = 100 - progressActiveWidth;
      this.setState({
        progressActiveWidth,
        progressWidth,
      });
    }
  }

  render() {
    const { songDuration, songCurrentTime } = this.props.seekBarState;
    if (typeof songDuration !== 'number' && typeof songCurrentTime !== 'number') {
      return null;
    }

    return (
      <div
        className="progressWrapper"
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onClick={this.handleClick.bind(this)}
      >
        <div className="progressActive" style={{ width: `${this.state.progressActiveWidth}%` }}></div>
        <div className="progress" style={{ width: `${this.state.progressWidth}%` }}></div>
        <div className="seekBar" style={{ width: this.state.seekPercent }}></div>
      </div>
    );
  }
}

SeekBar.propTypes = propTypes;

export default SeekBar;