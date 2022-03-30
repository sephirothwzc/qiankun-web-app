import { createActions } from 'redux-actions';
import { AppUserType } from '../reducer/app-user';

export const LOGIN_ACTION = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

const loginActions = createActions({
  [LOGIN_ACTION.LOGIN]: (appUser: AppUserType) => appUser,
  [LOGIN_ACTION.LOGOUT]: () => null,
});

export default loginActions;
