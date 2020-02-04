import proxyFetch from '../helpers/proxyFetch';
import * as R from 'ramda';
import { getAccessToken } from '../helpers/storage';
import { getProfile } from './api';

const fetchInstance = proxyFetch.getInstance();

const proxy = (method, url) => (params, settings) => fetchInstance[method](url, params, settings);
const proxyPost = R.curry(proxy)('post');
const proxyGet = R.curry(proxy)('get');

const isSignedIn = async () => {
  const token = getAccessToken();

  if (!token) {
    return false;
  }

  try {
    await getProfile();
    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
};

export const getUserInfo = async (params, settings) => {
  console.log('fetching user info...');

  if (await isSignedIn()) {
    return await getProfile();
  } else {
    return Promise.reject('请先登录！');
  }
};
