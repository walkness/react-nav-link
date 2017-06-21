import React, { PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import { Link } from 'react-router';
import classNames from 'classnames';


const NavLink = (props, context) => {
  const { liClassName, callback, indexOnly, additionalRoutes, dropdown, ...opts } = props;

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

      <Link className={classNames('nav-link', { active })} {...opts} />

      { dropdown }

    </li>
  );
};

NavLink.propTypes = {
  additionalRoutes: PropTypes.arrayOf(PropTypes.string),
  callback: PropTypes.func,
  dropdown: PropTypes.element,
  indexOnly: PropTypes.bool,
  liClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

NavLink.defaultProps = {
  additionalRoutes: [],
  callback: e => e,
  dropdown: null,
  indexOnly: false,
  liClassName: null,
};

NavLink.contextTypes = {
  router: routerShape,
};

export default NavLink;
