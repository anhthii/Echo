import React from 'react';
import PropTypes from 'prop-types';
import { redirectToHome } from '../../../actions/ui';
import './index.sass';

class SignUpPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = { animate: false };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
    });
  }

  handleOnClick() {
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.dispatch(redirectToHome()); // UI action
      this.context.router.push('/');
    }, 700);
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate && (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;

    return (
      <div className={className}>
        Sign Up With
        <br />
        <br />
        <div>
          <form>
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="Username" />
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="Password" />
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="Confirm password" />
          </form>
          <button id="sign_up" onClick={this.handleOnClick.bind(this)}>Sign up</button>
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
};

export default SignUpPage;


