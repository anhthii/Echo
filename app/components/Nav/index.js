import axios from "axios";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React from "react";
import { IndexLink, Link } from "react-router";
import { logout } from "../../actions/auth";
import { clearUserPlaylist } from "../../actions/user_playlist";
import SearchMenu from "../SearchMenu";
import "./nav.sass";

class Nav extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = { term: "", searchResult: {} };
    this.debounceSearch = debounce(this.search, 600);
  }

  search(term) {
    axios
      .get(`/api/media/search?term=${term}`)
      .then(({ data }) => {
        if (this.state.term.length) {
          this.setState({ searchResult: data });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  handleOnChange(e) {
    let term = e.target.value;
    if (!term) return this.setState({ term: "" });
    this.setState({ term });

    return this.debounceSearch(encodeURIComponent(term));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchResult.result && !nextState.term.length) {
      this.setState({ searchResult: {} });
    }
  }

  clearSearchResult() {
    this.setState({ term: "", searchResult: {} });
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearUserPlaylist());
    this.props.dispatch(logout());
    this.context.router.push("/");
  }

  render() {
    const { authenticated, user } = this.props.auth;

    return (
      <nav>
        <div className="logo">
          <Link to="/">Echo</Link>
        </div>
        <div className="searchBar">
          <div className="search-wrapper">
            <i className="ion-search"></i>
            <input
              type="text"
              placeholder="search for songs"
              value={this.state.term}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          {this.state.searchResult.msg ==="Success" && (
            <SearchMenu
              searchResult={this.state.searchResult}
              clearSearchResult={this.clearSearchResult.bind(this)}
            />
          )}
        </div>
        <div className="navRight">
          <ul className="nav-menu">
            <li>
              <IndexLink
                to="/"
                className="animating_link"
                activeClassName="nav-menu-link-active"
              >
                Home
              </IndexLink>
            </li>
            <li>
              <Link
                to="/charts"
                className="animating_link"
                activeClassName="nav-menu-link-active"
              >
                Charts
              </Link>
            </li>
            <li>
              <Link
                to="/albums"
                className="animating_link"
                activeClassName="nav-menu-link-active"
              >
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="/artists"
                className="animating_link"
                activeClassName="nav-menu-link-active"
              >
                Artists
              </Link>
            </li>
          </ul>
        </div>
        {!authenticated ? (
          <div className="auth-btns">
            <Link to="/login" className="animating_link">
              <img src="/svg/login.svg" />
              Log In
            </Link>
            <Link to="/signup" className="animating_link">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="user">
            <Link
              to={`/user/${user.username}`}
              className="animating_link ellipsis"
            >
              {user.username}
            </Link>
            <a
              href="#"
              title="Log Out"
              onClick={this.logOut.bind(this)}
              className="animating_link"
            >
              <img src="/svg/sign-out-option.svg" />
            </a>
          </div>
        )}
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
