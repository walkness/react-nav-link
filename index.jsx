import React, { PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import { Link } from 'react-router';
import classNames from 'classnames';


const NavLink = (props, context) => {
  const {
    liClassName, callback, indexOnly, additionalRoutes, dropdown, noLinkActive, ...opts
  } = props;

  let active = callback(context.router.isActive(props.to, indexOnly));
  if (!active) {
    active = additionalRoutes.reduce((prev, curr) => {
      if (context.router.isActive(curr, indexOnly)) return true;
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
  router: routerShape,
};

export default NavLink;
