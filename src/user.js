import { getUserInfo } from './api/login-api';

let fetching = false;

const getUserInfoFromNetwork = async () => {
  console.log('get user from network...');
  const res = await getUserInfo();

  if (res.success) {
    return res.data;
  }

  return null;
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
    return async ({ t }) => console.log('token = ', t)
  }

  static async logout() {
    UniUser.clearCache();
  }

  static clearCache() {
    fetching = false;
    console.log('user cached cleared');
  }
}
