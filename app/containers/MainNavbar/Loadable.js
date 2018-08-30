/**
 *
 * Asynchronously loads the component for MainNavbar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
