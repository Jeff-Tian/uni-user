import React, { useState, useEffect } from 'react';
import { UniUser } from '../src/index.js';
import UniUserContainer from '../src/containers/uni-user';
import { LoginStatus } from '../src/components/login-status';

export default {
  title: '登录状态',
  component: LoginStatus
};

export const CheckLoginStatus = () => {
  return <UniUserContainer><LoginStatus /></UniUserContainer>
}

CheckLoginStatus.story = {
  name: '检查是否已登录'
};
