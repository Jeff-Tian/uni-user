import React, { useState, useEffect } from 'react';
import { LoginButton } from '../src/components/login-button'

export default {
  title: '登录动作',
  component: LoginButton
};

export const LoginAction = () => {

  return <div>
    <LoginButton returnUrl={`${location.origin}/iframe.html?id=登录回调--login-callback-story&viewMode=story`} target="_blank" />
  </div>
}

LoginAction.story = {
  name: '登录动作',
};
