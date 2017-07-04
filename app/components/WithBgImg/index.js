import React from 'react';
import './index.sass';

// opacity transition for component with background image

class WithBgImg extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      opacity: 0.5,
      backgroundImage: '',
    };
  }

  fadeIn = () => {
    if (this.node) {
      this.setState({
        opacity: 1,
        backgroundImage: 'url(' + this.props.src + ')',
      });
    }
  }

  componentDidMount() {
    this.img = document.createElement('img');
    this.img.src = this.props.src;
    this
      .img
      .addEventListener('load', this.fadeIn);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ opacity: 0.7 });
      this.img.src = nextProps.src;
    }
  }

  render() {
    return (
      <div
        className={`bgImageContainer ${this.props.className}`}
        src={this.props.src}
        ref={(node) => { this.node = node; }}
        style={{
          opacity: this.state.opacity,
          backgroundImage: this.state.backgroundImage,
        }}>
        {this.props.children}
      </div>
    );
  }
}

export default WithBgImg;
