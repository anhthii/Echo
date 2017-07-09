import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { redirectToHome } from '../../../actions/ui';
import './index.sass';


class AuthPage extends React.Component {
  state = { animate: false };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
    });
  }

  goToRegister() {
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.dispatch(redirectToHome()); //  UI
      browserHistory.push('/');
    }, 700);
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate && (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
    return (
      <div className={className}>
        Sign Up With
        <div className="auth-box-social">
          <div className="column-8 left">
            <button className="fb-btn">
              <i className="ion-social-facebook"></i>
              <span>facebook</span>
            </button>
          </div>
          <div className="column-8 right ">
            <button className="gg-btn"><i className="ion-social-google"></i>google</button>
          </div>
        </div>
        <div className="auth-box-devider">
          Or
        </div>
        <div>
          <form>
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="username" />
            <label htmlFor=""></label>
            <input type="text" className="form-control" placeholder="username" />
          </form>
          <button type="submit" id="sign_up" onClick={() => this.goToRegister()}>Sign up</button>
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

AuthPage.propTypes = {
  redirectToHome: PropTypes.func,
};


export default AuthPage;


