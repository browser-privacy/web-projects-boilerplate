/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_USER = 'app/App/LOAD_USER';
export const PERSIST_USER = 'app/App/PERSIST_USER';
export const SET_USER_ID = 'app/App/SET_USER_ID';
export const SET_USER_USERNAME = 'app/App/SET_USER_USERNAME';
export const SET_USER_EMAIL = 'app/App/SET_USER_EMAIL';
export const SET_IS_USER_EMAIL_CONFIRMED =
  'app/App/SET_IS_USER_EMAIL_CONFIRMED';
