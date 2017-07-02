// code copied from https://github.com/chentsulin/react-karaoke-lyric

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
};

const defaultFontStyle = {
  whiteSpace: 'nowrap',
  fontSize: '25px',
  color: 'white',
  textShadow: '-1px 0 #080d16, 0 1px #080d16',
};

const defaultActiveStyle = {
  ...defaultFontStyle,
  position: 'absolute',
  left: 0,
  top: 0,
  color: 'blue',
  overflow: 'hidden',
  zIndex: 1,
};

export default class KaraokeLyric extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    fontStyle: PropTypes.object,
    activeStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
  }

  render() {
    const { percentage, text } = this.props;
    let { wrapperStyle, fontStyle, activeStyle } = this.props;

    wrapperStyle = wrapperStyle ? {
      ...defaultWrapperStyle,
      ...wrapperStyle,
    } : defaultWrapperStyle;
    fontStyle = fontStyle ? {
      ...defaultFontStyle,
      ...fontStyle,
    } : defaultFontStyle;
    activeStyle = activeStyle ? {
      ...defaultActiveStyle,
      ...activeStyle,
      width: `${percentage}%`,
    } : {
      ...defaultActiveStyle,
      width: `${percentage}%`,
    };

    return (
      <div style={wrapperStyle}>
        <div style={fontStyle}>{text}</div>
        <div style={activeStyle}>{text}</div>
      </div>
    );
  }
}