import React from "react";
import querystring from "querystring";
import { UniUser } from "../user";

const w = window.parent ?? window;

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
        if (window.opener) {
            window.opener.postMessage(window.location.search, window.location.origin);
        }

        this.popupLogin();
    }

    popupLogin() {
        const query = querystring.parse(window.location.search.substr(1));

        const tokenResult: any = this.props.tokenResult || { token: query.t };

        if (tokenResult.token) {
            UniUser.loginByToken(console.log)(tokenResult).then(
                async (returnObj: any) => {
                    const returnPath = window.localStorage.getItem("returnPath");
                    if (returnPath) {
                        window.location.href = returnPath;
                        window.localStorage.setItem("returnPath", "");
                    } else {
                        window.location.href = returnObj;
                    }
                }
            );
        }
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
