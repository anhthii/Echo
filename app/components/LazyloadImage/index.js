import React from 'react';
import PropTypes from 'prop-types';
import './index.sass';

class LazyloadImage extends React.Component {
  handleImageLoaded() {
    this.tempImg = new Image();
    this.tempImg.src = this.refs.img.src;
    this.tempImg.onload = () => {
      const $wrapper = this.refs.wrapper;
      if ($wrapper) {
        const placeHolder = $wrapper.children[0];
        $wrapper.replaceChild(this.tempImg, placeHolder);
        $wrapper.className += ' loaded';
      }
    };
  }

  render() {
    return (
      <div className={`${this.props.className} lazyload-img`} ref='wrapper'>
        <img
          src={this.props.src}
          onLoad={this.handleImageLoaded.bind(this)}
          ref='img'
          alt=""
        />
      </div>
    );
  }
}

LazyloadImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LazyloadImage;
