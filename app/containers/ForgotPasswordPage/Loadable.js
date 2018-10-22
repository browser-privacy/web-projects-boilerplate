/**
 *
 * Asynchronously loads the component for ForgotPasswordPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
