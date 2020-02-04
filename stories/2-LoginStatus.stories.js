import React, { useState, useEffect } from 'react';
import { UniUser } from '../src/index.js';

export default {
  title: '登录状态',
  component: () => <p>Hello</p>
};

export const CheckLoginStatus = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    UniUser.getInfo()
      .then(res => {
        if (res.statusCode === 401) {
          throw res;
        }

        setHasLoggedIn(res !== null)
      })
      .catch(console.error)
  });

  return <p>用户已登录？{hasLoggedIn.toString()}</p>
}

CheckLoginStatus.story = {
  name: '检查是否已登录'
};
