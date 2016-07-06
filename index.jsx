import React, { PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import { Link } from 'react-router';


const NavLink = (props, context) => {
  const { liClassName, callback, indexOnly, additionalRoutes, dropdown, ...opts } = props;
  let liClassNameList = [];
  if (liClassName)
    liClassNameList.push(liClassName)
  if (callback(context.router.isActive(props.to, indexOnly))) {
    liClassNameList.push('active');
  } else {
    for (const route of additionalRoutes) {
      if (context.router.isActive(route, indexOnly)) {
        liClassNameList.push('active');
        break;
      }
    }
  }

  return (
    <li className={ liClassNameList.join(' ') }>
      <Link {...opts}/>
      { dropdown }
    </li>
  )
}

NavLink.propTypes = {
  liClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  additionalRoutes: PropTypes.array,
  indexOnly: PropTypes.bool,
  callback: PropTypes.func,
}

NavLink.defaultProps = {
  additionalRoutes: [],
  indexOnly: false,
  callback: (e) => e,
}

NavLink.contextTypes = {
  router: routerShape,
}

export default NavLink;
