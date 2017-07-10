import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import './index.sass';


class LogInPage extends React.Component {
  state = { animate: false };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
    });
  }

  goToSignUpPage(e) {
    e.preventDefault();
    this.setState({ leave: true });
    setTimeout(() => {
      browserHistory.push('/signup');
    }, 700);
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate && (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
    return (
      <div className={className}>
        Log in to download songs for free
        <br />
        <br />
        <div>
          <form>
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="Username" />
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="Password" />
            <button type="submit" id="sign_up" onClick={() => this.goToRegister()}>Log In</button>
          </form>
        </div>
        <footer className="login-footer">
          New here, <a href="#" onClick={this.goToSignUpPage.bind(this)}>Create an account</a>
        </footer>
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

export default LogInPage;


