import actions, { LOGIN_ACTION } from '@/redux/action/app-user';
import store from '@/redux/store';
import { Maybe } from '@/utils/type-helper';

/**
 * 获取 Token
 */
const getToken = (): Maybe<string> => {
  const state = store.getState();
  return state.login.appUser?.token;
};

/**
 * 设置 Token
 */
const setToken = (token: string): void => {
  // 将 token 的值记录在 store 中
  actions[LOGIN_ACTION.LOGIN]({ token });
};

/**
 * 全局对象 shared
 */
export const SharedModule = { getToken, setToken };

/**
 * 微应用 替换
 * @param param0
 */
export const overloadShared = (param: {
  getToken: () => Maybe<string>;
  setToken: (token: string) => void;
}) => {
  SharedModule.getToken = param.getToken;
  SharedModule.setToken = param.setToken;
};
