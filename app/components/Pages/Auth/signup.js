import React from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from './TextInputGroup';
import { slideInRight } from '../../../actions/ui';
import { signup } from '../../../actions/auth';
import './index.sass';

class SignUpPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    animate: false,
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      this.setState({ leave: true });
      setTimeout(() => {
        this.props.dispatch(slideInRight()); // UI action
        this.context.router.push('/');
      }, 700);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirmation } = this.state;

    this.props.dispatch(signup({
      username,
      password,
      passwordConfirmation,
    }));
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate &&
      (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
    const errors = this.props.auth.errors;

    return (
      <div className={className}>
        Sign Up Below:
        <br />
        <br />
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              placeholder="Username"
              name="username"
              error={errors.username}
              onChange={this.onChange.bind(this)}

            />
            <TextInputGroup
              type="password"
              placeholder="Password"
              name="password"
              error={errors.password}
              onChange={this.onChange.bind(this)}
            />
            <TextInputGroup
              type="password"
              placeholder="Confirm your password"
              name="passwordConfirmation"
              error={errors.passwordConfirmation}
              onChange={this.onChange.bind(this)}
            />
            <button
              id="sign_up"
              type="submit"
              disabled={this.props.auth.isProcessing}
            >
              {!this.props.auth.isProcessing ? 'Sign Up' : '...Processing'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="auth">
        <div className="auth-box-wrapper">
          {this.renderAuthBox()}
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    isProcessing: PropTypes.bool,
  }),
};

export default SignUpPage;


