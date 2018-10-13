/**
 *
 * Asynchronously loads the component for EmailVerificationPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
