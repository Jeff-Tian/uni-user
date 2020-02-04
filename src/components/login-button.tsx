import React from 'react';
import { Button } from 'antd';
import loginViaPopup from './login-popup';
import { connect } from 'react-redux';
import { setLoading } from '../redux/actions/login'

const w = window.parent ?? window;

const RawLoginButton = ({ target, returnUrl, startLogin, loading, dispatch }) => {
    const ssoUrl = `https://sso.pa-ca.me/app/login?r=${encodeURIComponent(returnUrl ?? w.location.href)}`

    const gotoLoginPage = (evt) => {
        startLogin()

        if (target === '_blank') {
            evt.preventDefault();
            loginViaPopup(w, ssoUrl)(dispatch);
        }
    }

    return <Button href={ssoUrl} onClick={gotoLoginPage} type="primary" htmlType="button" loading={loading}>登录</Button>
}

export const LoginButton = connect((state, ownProps) => {
    return {
        loading: state.login.loading
    }
}, (dispatch, ownProps) => {
    return {
        dispatch,
        startLogin: () => dispatch(setLoading(true))
    }
})(RawLoginButton)