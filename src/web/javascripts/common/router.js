const getRouteVars = (match) => {
  const paths = match.split('/');
  const routeVars = [];
  paths.forEach((value) => {
    if (value[0] === ':') {
      routeVars.push({
        key: value.slice(1),
        index: routeVars.length ? routeVars.length + 1 : 1,
      });
    }
  });
  return routeVars;
};

const getRouteRegex = (pathname) => {
  const pathVars = /(:[a-zA-Z0-9-_]+)/;
  const pathRegex = '([a-zA-Z0-9-_]+)';
  return pathname.replace(pathVars, pathRegex);
};

const router = (routes) => {
  const handleRoute = () => {
    const pathName = window.location.pathname;
    for (let itr = 0; itr < routes.length; itr += 1) {
      const { match } = routes[itr];
      const matcher = new RegExp(getRouteRegex(match));
      const matched = pathName.match(matcher);
      const routeVars = getRouteVars(match);
      if (matched) {
        const routeData = {};
        routeVars.forEach((value) => {
          routeData[value.key] = matched[value.index];
        });
        routes[itr].action(routeData);
        break;
      }
    }
  };

  const listener = () => {
    window.addEventListener('popstate', () => {
      handleRoute(routes);
    });
  };

  const navigateTo = (url, withStack = false, state = {}, title = '') => {
    if (!withStack) {
      window.history.replaceState(state, title, url);
    } else {
      window.history.pushState(state, title, url);
    }
    handleRoute();
  };

  handleRoute();
  listener();

  return {
    navigateTo,
  };
};

export default router;
