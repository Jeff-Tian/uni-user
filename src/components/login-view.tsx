import React, { useState, useEffect } from 'react';
import { LoginButton } from './login-button'
import { UniUser } from '../user';

export const LoginStatus = (props) => {
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    useEffect(() => {
        UniUser.getInfo()
            .then((res: any) => {
                if (res.statusCode === 401) {
                    throw res;
                }

                setHasLoggedIn(res !== null)
            })
            .catch(console.error)
    });

    return hasLoggedIn ? <>已登录</> : <LoginButton target="_blank" returnUrl={`${location.origin}/iframe.html?id=登录回调--login-callback-story&viewMode=story`} />
}