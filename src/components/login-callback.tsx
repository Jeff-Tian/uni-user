import React, { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import querystring from "querystring";
import { login, setUser } from "../redux/actions/login";
import { UniUser } from "../user";
import { connect } from "@tarojs/redux";

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
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }

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
                    const returnPath = Taro.getStorageSync("returnPath");
                    if (returnPath) {
                        await Taro.navigateTo({
                            url: returnPath,
                            fail: async () => {
                                await Taro.navigateTo(returnObj);
                            },
                            success: () => {
                                Taro.removeStorageSync("returnPath");
                            }
                        });
                    } else {
                        await Taro.navigateTo(returnObj);
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
