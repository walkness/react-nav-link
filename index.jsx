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
    for (const route of additionalRoutes) {
      if (context.router.isActive(route, indexOnly)) {
        active = true;
        break;
      }
    }
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
  liClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  additionalRoutes: PropTypes.array,
  indexOnly: PropTypes.bool,
  callback: PropTypes.func,
  dropdown: PropTypes.element,
  noLinkActive: PropTypes.bool,
  children: PropTypes.node,
};

NavLink.defaultProps = {
  additionalRoutes: [],
  indexOnly: false,
  callback: (e) => e,
};

NavLink.contextTypes = {
  router: routerShape,
};

export default NavLink;
