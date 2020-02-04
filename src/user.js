import { getUserInfo } from './api/login-api';
import { setAccessToken } from './helpers/storage';

let fetching = false;

const getUserInfoFromNetwork = async () => {
  console.log('get user from network...');
  const res = await getUserInfo();

  console.log('res = ', res);
  return res
};

export class UniUser {
  static async getInfo() {
    console.log('getting user...');
    if (!fetching) {
      fetching = getUserInfoFromNetwork();
    }

    return fetching;
  }

  static loginByToken(dispatch) {
    return async ({ token }) => {
      setAccessToken(token);
    }
  }

  static async logout() {
    UniUser.clearCache();
  }

  static clearCache() {
    fetching = false;
    console.log('user cached cleared');
  }
}
