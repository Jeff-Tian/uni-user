import React, { useState, useEffect } from 'react';
import { LoginButton } from '../src/components/login-button'

export default {
  title: '登录动作',
  component: LoginButton
};

export const LoginAction = () => {

  return <div>
    <LoginButton returnUrl={`${location.origin}?path=/story/登录回调--login-callback`} target="_blank" />
  </div>
}

LoginAction.story = {
  name: '登录动作',
};
