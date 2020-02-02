import React from 'react';
import { Button } from 'antd';

const gotoLoginPage = () => {
    const w = window.parent ?? window;

    const returnUrl = w.location.href;

    const ssoUrl = `https://sso.pa-ca.me/app/login?r=${encodeURIComponent(returnUrl)}`

    w.location.href = ssoUrl;
}

export const LoginButton = () => {
    return <Button onClick={gotoLoginPage}>登录</Button>
}