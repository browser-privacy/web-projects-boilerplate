/*
 *
 * EmailVerificationPage actions
 *
 */

import { EMAIL_VERIFICATION_CHECK } from './constants';

export function emailVerificationCheckAction() {
  return {
    type: EMAIL_VERIFICATION_CHECK,
  };
}
