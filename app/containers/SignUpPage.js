import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { resetSlideInRight } from '../actions/ui';
import { clearErrors } from '../actions/auth';
import { isEmpty } from '../utils/func';

class SignUpPage extends React.Component {
  componentDidMount() {
    if (this.props.slideInRight) {
      this.props.dispatch(resetSlideInRight());
    }

    // clear errors in the auth state from the previous authentication attempt
    if (!isEmpty(this.props.auth.errors)) {
      this.props.dispatch(clearErrors());
    }
  }

  render() {
    return (
      <Pages.SignUpPage
        dispatch={this.props.dispatch}
        auth={this.props.auth}
      />
    );
  }
}

function mapStateToProps({ auth, UIState }) {
  return { auth, slideInRight: UIState.slideInRight };
}

export default connect(mapStateToProps)(SignUpPage);
