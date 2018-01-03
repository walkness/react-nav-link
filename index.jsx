import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


const NavLink = (props, context) => {
  const {
    liClassName, callback, indexOnly, additionalRoutes, dropdown, noLinkActive, ...opts
  } = props;

  const isActive = (path) => {
    let active = false;
    const { router } = context;
    if (path && router) {
      const { location } = router.history;
      active = matchPath(location.pathname, { path }) !== null;
    }
    return active;
  };

  let active = callback(isActive(props.to, indexOnly));
  if (!active) {
    active = additionalRoutes.reduce((prev, curr) => {
      if (isActive(curr, indexOnly)) return true;
      return prev;
    }, false);
  }

  return (
    <li
      className={classNames(
        'nav-item',
        { [liClassName]: liClassName },
        { active },
      )}
    >

      { noLinkActive ? props.children :
      <Link className={classNames('nav-link', { active })} {...opts} />
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
