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
  name: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU4MDQ1MDQ4NSwiZXhwIjoxNTgwNDUwNTQ1fQ.tW03Z688BjUy9v4s78InM3agHRHJVnn7YH7yDvIYIyQ',
};
