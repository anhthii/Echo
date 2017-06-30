import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import { AlbumGenres } from '../../../seed';
import './index.sass';

const GenreMenu = ({ genres = AlbumGenres }) => {
  return (
    <div>
      <ul className='genre-menu'>
        <ul className='submenu'>
          <li className="submenu-title">
            <Link to='/album' activeClassName='submenu-link-active'>Album Hot</Link>
          </li>
        </ul>
        { Object.keys(genres)
          .map(origin => <SubMenu key={origin} {...genres[origin]} title={origin}/>)
        }
      </ul>
    </div>
  );
};

const SubMenu = ({ name, id, title, children }) => (
  <ul className='submenu'>
    <li className="submenu-title">
      <Link to={`/album/${name}/${id}`} activeClassName='submenu-link-active'>{title}</Link>
    </li>
    { children.map(obj => <SubMenuLi key={obj.id} {...obj}/>) }
  </ul>
);

const SubMenuLi = (props) => (
  <li className="submenu-li">
    <Link
      to={`/album/${changeAlias(props.title)}/${props.id}`}
      activeClassName='submenu-link-active'
    >{props.title}</Link>
  </li>
);

export default GenreMenu;