import { LOGIN_ACTION } from '../action/app-user';
import { Action, handleActions as createReducers } from 'redux-actions';
import { produce } from 'immer';
import { Maybe } from '@/utils/type-helper';
/**
 * 当前登录用户
 */
export type AppUserType = {
  /**
   *  用户名
   */
  userName?: string;
  /**
   * 用户token
   */
  token?: string;
};

const defaultState = {
  // defautl value 不能为null
  appUser: {} as AppUserType,
};

export default createReducers(
  {
    // payload 参数名固定，类型推导
    [LOGIN_ACTION.LOGIN]: produce(
      (draft: typeof defaultState, { payload }: Action<Maybe<AppUserType>>) => {
        if (!payload) {
          draft.appUser = {};
        } else {
          draft.appUser = payload;
        }
      }
    ),
    // 异常处理
    [LOGIN_ACTION.LOGOUT]: {
      next(state: typeof defaultState) {
        return produce((draft: typeof defaultState) => {
          draft.appUser = {};
        })(state);
      },
      throw(state: typeof defaultState) {
        return state;
      },
    },
  },
  defaultState
);
