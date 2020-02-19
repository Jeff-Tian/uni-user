import React from 'react';
import { LoginButton } from '../src/components/login-button'
import UniUserContainer from '../src/containers/uni-user';

export default {
  title: '登录动作',
  component: LoginButton
};

export const LoginAction = () => {

  return <UniUserContainer>
    <LoginButton returnUrl={`${location.origin}/iframe.html?id=登录回调--login-callback-story&viewMode=story`} target="_blank" />
  </UniUserContainer>
}

LoginAction.story = {
  name: '登录动作',
};
