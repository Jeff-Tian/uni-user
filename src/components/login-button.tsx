import React from 'react';
import { Button } from 'antd';
import loginViaPopup from './login-popup';

const w = window.parent ?? window;


export const LoginButton = (props) => {
    const gotoLoginPage = () => {
        const returnUrl = props.returnUrl ?? w.location.href;

        const ssoUrl = `https://sso.pa-ca.me/app/login?r=${encodeURIComponent(returnUrl)}`

        if (props.target === '_blank') {
            // w.open(ssoUrl);
            loginViaPopup(w, ssoUrl)(console.log);
        } else {
            w.location.href = ssoUrl;
        }
    }

    return <Button onClick={gotoLoginPage}>登录</Button>
}