import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as BaseNavLink } from 'react-router-dom';
import classNames from 'classnames';


const NavLink = (props) => {
  const {
    liClassName, callback, indexOnly, additionalRoutes, dropdown, noLinkActive, ...opts
  } = props;
  return (
    <li
      className={classNames(
        'nav-item',
        { [liClassName]: liClassName },
      )}
    >

      { noLinkActive ? props.children :
      <BaseNavLink
        className='nav-link'
        {...opts}
        activeClassName='active'
        exact={indexOnly}
      />
      }

      { dropdown }

    </li>
  );
};

NavLink.propTypes = {
  additionalRoutes: PropTypes.arrayOf(PropTypes.string),
  callback: PropTypes.func,
  children: PropTypes.node,
  dropdown: PropTypes.element,
  indexOnly: PropTypes.bool,
  liClassName: PropTypes.string,
  noLinkActive: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

NavLink.defaultProps = {
  additionalRoutes: [],
  callback: e => e,
  children: null,
  dropdown: null,
  indexOnly: false,
  liClassName: null,
  noLinkActive: false,
};

NavLink.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.object,
    }),
  }),
};

export default NavLink;
