import React, { useState, useEffect } from 'react';
import { UniUser } from '../src/index.js';
import { LoginStatus } from '../src/components/login-view';

export default {
  title: '登录状态',
  component: LoginStatus
};

export const CheckLoginStatus = () => {
  return <LoginStatus />
}

CheckLoginStatus.story = {
  name: '检查是否已登录'
};
