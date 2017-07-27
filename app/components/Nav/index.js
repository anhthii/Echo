import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import SearchMenu from '../SearchMenu';
import { logout } from '../../actions/auth';
import { clearUserPlaylist } from '../../actions/user_playlist';
import './nav.sass';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = { term: '', searchResult: {} };
    this.debounceSearch = debounce(this.search, 300);
  }

  search(term) {
    axios.get(`/api/media/search?term=${term}`)
      .then(({ data }) => {
        if (this.state.term.length) {
          this.setState({ searchResult: data });
        }
      })
      .catch(err => console.log(err));
  }

  handleOnChange(e) {
    let term = e.target.value;
    if (!term) return this.setState({ term: '' });
    this.setState({ term });
    term = term.replace(/\s+/g, '+');
    return this.debounceSearch(term);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchResult.result && !nextState.term.length) {
      this.setState({ searchResult: {} });
    }
  }

  clearSearchResult() {
    this.setState({ term: '', searchResult: {} });
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearUserPlaylist());
    this.props.dispatch(logout());
  }

  render() {
    const { authenticated, user } = this.props.auth;

    return (
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="https://a-v2.sndcdn.com/assets/images/header/wordmark-d95b0ac.png" alt=""/>
          </Link>
        </div>
        <div className="searchBar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="search for songs"
              value={this.state.term}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          { this.state.searchResult.result &&
            <SearchMenu
              searchResult={this.state.searchResult}
              clearSearchResult={this.clearSearchResult.bind(this)}
            />
          }
        </div>
        <div className="navRight">
          <ul className="nav-menu">
            <Link to="/charts">
              <li>BXH</li>
            </Link>
            <Link to="/albums">
              <li>Album</li>
            </Link>
            <Link to="/artists">
              <li>Artist</li>
            </Link>
            <a href="#">
              <li>Top 100</li>
            </a>
          </ul>
        </div>
        {
          !authenticated
          ? <div className="auth-btns">
            <Link to="/login" className='sInLink'>Log In</Link>
            <Link to="/signup" className='sUpLink'>Sign Up</Link>
          </div>
          : <div className="user">
            <Link to={`/user/${user.username}`}>{user.username}</Link>
            <a href="#" onClick={this.logOut.bind(this)}>Log out</a>
          </div>

        }
      </nav>
    );
  }
}

Nav.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default Nav;
