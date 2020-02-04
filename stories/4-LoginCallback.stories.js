import React, { useState, useEffect } from 'react';
import LoginCallback from '../src/components/login-callback'

export default {
  title: '登录回调',
  component: LoginCallback
};

export const LoginCallbackStory = () => {
  const token = window.parent.location.href

  return <div>
    Token = {token}
    <LoginCallback />
  </div>
}

LoginCallbackStory.story = {
  name: '登录回调',
};
