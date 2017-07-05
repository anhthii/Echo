import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/home';

const NUMBER_OF_PAGES = 5;

export default function (ComposedComponent) {
  class FetchOnScroll extends Component {
    constructor(props) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
      // delay the scroll event

      if (this.timer) {
        window.clearTimeout(this.timer);
      }

      this.timer = window.setTimeout(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
          if (this.props.pageLoaded < NUMBER_OF_PAGES && !this.props.isLoading) {
            const page = this.props.pageLoaded + 1;
            this.props.fetchTracks(page);
          }
        }
      }, 100);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  FetchOnScroll.propTypes = {
    fetchTracks: PropTypes.func.isRequired,
    pageLoaded: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  return connect((state) =>
  ({ pageLoaded: state.trackState.pageLoaded,
    isLoading: state.trackState.isLoading,
  }),
  { fetchTracks })(FetchOnScroll);
}
