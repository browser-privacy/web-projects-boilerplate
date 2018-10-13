import { fromJS } from 'immutable';
import emailVerificationPageReducer from '../reducer';

describe('emailVerificationPageReducer', () => {
  it('returns the initial state', () => {
    expect(emailVerificationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
