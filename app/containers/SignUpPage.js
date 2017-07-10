import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';

class SignUpPage extends React.Component {
  render() {
    return (
      <Pages.SignUpPage dispatch={this.props.dispatch} />
    );
  }
}

export default connect(null)(SignUpPage);
