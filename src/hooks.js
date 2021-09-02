import { useMemo } from 'react';
import { useSubscription } from 'use-subscription';
import { globalHistory } from '@reach/router';
import ROUTES from './routes';

export function useLocation() {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => globalHistory.location,
      subscribe: (callback) => globalHistory.listen(callback),
    }),
    [],
  );

  return useSubscription(subscription);
}

export function usePrevAndNextRoutes() {
  const { pathname } = useLocation();

  const routesArray = useMemo(() => Object.keys(ROUTES), []);
  const routeIndex = useMemo(() => routesArray.indexOf(pathname), [
    pathname,
    routesArray,
  ]);

  let nextLink =
    routeIndex >= 0 && routeIndex < routesArray.length - 1
      ? routesArray[routeIndex + 1]
      : null;
  let prevLink = routeIndex > 0 ? routesArray[routeIndex - 1] : null;

  return useMemo(() => ({ nextLink, prevLink }), [nextLink, prevLink]);
}
