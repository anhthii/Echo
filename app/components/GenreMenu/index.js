import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { changeAlias } from '../../utils/func';
import { AlbumGenres } from '../../../seed';
import './index.sass';

const GenreMenu = ({ genres = AlbumGenres, type }) => {
  return (
    <div>
      <ul className='genre-menu'>
        <ul className='submenu'>
          <li className="submenu-title">
            <Link to={`/${type}`} activeClassName='submenu-link-active'>Album Hot</Link>
          </li>
        </ul>
        { Object.keys(genres)
          .map(origin => <SubMenu key={origin} {...genres[origin]} title={origin} type={type}/>)
        }
      </ul>
    </div>
  );
};

const SubMenu = ({ name, id, title, children, type }) => (
  <ul className='submenu'>
    <li className="submenu-title">
      <Link to={`/${type}/${name}/${id}`} activeClassName='submenu-link-active'>{title}</Link>
    </li>
    { children.map(obj => <SubMenuLi key={obj.id} {...obj} type={type}/>) }
  </ul>
);

const SubMenuLi = (props) => (
  <li className="submenu-li">
    <Link
      to={`/${props.type}/${changeAlias(props.title)}/${props.id}`}
      activeClassName='submenu-link-active'
    >{props.title}</Link>
  </li>
);

GenreMenu.propTypes = {
  type: PropTypes.string.isRequired,
};

export default GenreMenu;
