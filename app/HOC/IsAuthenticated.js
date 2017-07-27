import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class IsAuthenticated extends React.Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    redirectTo(route) {
      this.context.router.push(route);
    }

    render() {
      return <ComposedComponent
        redirectTo={this.redirectTo.bind(this)}
        {...this.props}
      />;
    }
  }

  function mapStateToProps({ auth }) {
    const { authenticated, user } = auth;

    return { authenticated, user };
  }

  IsAuthenticated.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  return connect(mapStateToProps)(IsAuthenticated);
}
