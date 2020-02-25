require('es6-promise').polyfill();
require('isomorphic-fetch');
import { message } from 'antd';
import { createIntl } from 'react-intl';

const REQUEST_TIME_OUT = 10 * 1000;
const LOADING_TIME_OUT = 1000;

class ProxyFetch {
  constructor() {
    this.headers = { 'Content-Type': 'application/json' };
    this.init = { credentials: 'include', mode: 'cors' };
    // 处理loading
    this.requestCount = 0;
    this.isLoading = false;
    this.loadingTimer = null;

    this.intl = createIntl({
      locale: global.locale || 'zh',
      messages: require('../locale/index.jsx').messagesForLogin[global.locale || 'zh']
    });

    this.setMessage(message);
  }

  setMessage(message) {
    this.message = message;
  }

  /**
   * 请求1s内没有响应显示loading
   */
  showLoading() {
    if (this.requestCount === 0) {
      this.loadingTimer = setTimeout(() => {
        this.message.loading(this.intl.formatMessage({ id: 'text-loading' }), 0);
        this.isLoading = true;
        this.loadingTimer = null;
      }, LOADING_TIME_OUT);
    }
    this.requestCount++;
  }

  hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer);
        this.loadingTimer = null;
      }
      if (this.isLoading) {
        this.isLoading = false;
        this.message.destroy();
      }
    }
  }

  /**
   * 获取proxyFetch单例对象
   */
  static getInstance() {
    if (!global.fetchInstance) {
      global.fetchInstance = new ProxyFetch();
    }
    return global.fetchInstance;
  }

  /**
   * get请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async get(url, params = {}, settings = {}) {
    const options = { method: 'GET' };
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => {
        if (params[key] instanceof Array) {
          const value = params[key].map(item => '"' + item + '"');
          paramsArray.push(key + '=[' + value.join(',') + ']');
        } else {
          paramsArray.push(key + '=' + params[key]);
        }
      });
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }

    return await this.dofetch(url, options, settings);
  }

  /**
   * post请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async post(url, params = {}, settings = {}) {
    const options = { method: 'POST' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * put请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async put(url, params = {}, settings = {}) {
    const options = { method: 'PUT' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * put请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async delete(url, params = {}, settings = {}) {
    const options = { method: 'DELETE' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * fetch主函数
   * @param {*} url
   * @param {*} options
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  dofetch(url, options, settings = {}) {
    const { isServer, noLoading, noClientCookies } = settings;

    if (!isServer && !noLoading) {
      this.showLoading();
    }
    const prefix = '';
    const init = noClientCookies ? {} : this.init;

    return new Promise((resolve, reject) => {
      Promise.race([
        fetch(prefix + url, { headers: this.headers, ...init, ...options }),

        new Promise((resolve, reject) => {
          setTimeout(() => reject(this.intl.formatMessage({ id: 'error-timeout' })), REQUEST_TIME_OUT);
        })
      ])
        .then(response => {
          !isServer && !noLoading && this.hideLoading();
          if (response.status === 404) {
            reject(this.intl.formatMessage({ id: 'error-not-found' }));
          } else if (response.status === 401) {
            reject(this.intl.formatMessage({ id: 'error-not-authorized' }));
          } else if (response.status === 400) {
            reject(this.intl.formatMessage({ id: 'error-bad-request' }));
          } else if (response.status === 204) {
            resolve({ success: true });
          } else {
            if (response) {
              return response.json();
            } else {
              resolve({ success: true });
            }
          }
        })
        .then(json => {
          if (!json) {
            reject({ success: false });
          } else {
            if (json.success) {
              resolve(json);
            } else {
              // 应该是 throw json，但由于其他调用方没有 try catch，而是自行判断 success，这里暂不能用 throw json;
              // throw json;
              resolve(json);
            }
          }
        })
        .catch(ex => {
          if (!noLoading) {
            this.hideLoading();
          }
          reject(
            this.intl.formatMessage({
              id: 'error-' + (ex.errmessage || (ex.message ? ex.message.details || ex.message : 'unknown'))
            })
          );
        });
    });
  }
}

export default ProxyFetch;
