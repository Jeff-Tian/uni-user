import React, { useState } from 'react';
import { Button } from 'antd';
import loginViaPopup from './login-popup';

const w = window.parent ?? window;

export const LoginButton = (props) => {
    const { target } = props;

    const returnUrl = props.returnUrl ?? w.location.href;

    const ssoUrl = `https://sso.pa-ca.me/app/login?r=${encodeURIComponent(returnUrl)}`

    const [loading, setLoading] = useState(false);

    const gotoLoginPage = (evt) => {
        setLoading(true);

        if (target === '_blank') {
            evt.preventDefault();
            loginViaPopup(w, ssoUrl)(console.log);
        }
    }

    return <Button href={ssoUrl} onClick={gotoLoginPage} type="primary" htmlType="button" loading={loading}>登录</Button>
}