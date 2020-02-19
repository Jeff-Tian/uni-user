import React from 'react';
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
