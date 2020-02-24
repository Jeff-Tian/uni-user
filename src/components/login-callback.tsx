import React from "react";
import { handleCallback } from './login-callback-functions';

type PageDispatchProps = {
    login: () => void;
    logout: () => void;
    setUser: (user) => void;
    popupLogin: () => void;
};

type IProps = PageDispatchProps & { tokenResult: { token: string } };

interface Callback {
    props: IProps;
}

class Callback extends React.Component {
    componentWillUnmount() { }

    componentDidMount() {
        handleCallback();
    }

    componentDidHide() { }

    render() {
        return (
            <div className="container">
                <p>登录成功，窗口即将关闭，请稍等……</p>
            </div>
        );
    }
}


export default Callback;
