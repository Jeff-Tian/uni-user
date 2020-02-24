import React, { useEffect } from 'react';
import { LoginButton } from './login-button'
import { UniUser } from '../user';
import { connect } from 'react-redux';
import { setLoading, setUser, setChecking } from '../redux/actions/login';

export const LoginStatus = connect((state, ownProps) => ({
    hasLoggedIn: state.login.user !== null,
    loading: state.login.loading,
    checking: state.login.checking
}), (dispatch, ownProps) => ({
    startCheckingLoginStatus: () => dispatch(setChecking(true)),
    endCheckingLoginStatus: () => dispatch(setChecking(false)),
    setUserInfo: (user) => dispatch(setUser(user))
}))(({ hasLoggedIn, startCheckingLoginStatus, setUserInfo, endCheckingLoginStatus, checking }) => {
    useEffect(() => {
        startCheckingLoginStatus();

        UniUser.getInfo()
            .then(setUserInfo)
            .catch(console.error)
            .finally(endCheckingLoginStatus)
    }, []);

    return !checking ? (hasLoggedIn ? <>已登录</> : <LoginButton target="_blank" returnUrl={`${location.origin}/iframe.html?id=登录回调--login-callback-story&viewMode=story`} />) : <>查询登陆状态中...</>
})