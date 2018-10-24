/**
 *
 * Asynchronously loads the component for ResetPasswordPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
