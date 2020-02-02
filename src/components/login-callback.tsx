import React, { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import querystring from "querystring";
import { login, setUser } from "../redux/actions/login";
import { UniUser } from "../user";
import { connect } from "@tarojs/redux";

type PageDispatchProps = {
    login: () => void;
    logout: () => void;
    setUser: (user) => void;
    popupLogin: () => void;
};

type IProps = PageDispatchProps;

interface Callback {
    props: IProps;
}

class Callback extends React.Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: "账号登录中，请稍等…… | 我的个人中心"
    };

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }

    componentWillUnmount() { }

    componentDidShow() {
        if (window.opener) {
            window.opener.postMessage(window.location.search, window.location.origin);
        }

        this.popupLogin();
    }
    popupLogin() {
        const tokenResult: any = querystring.parse(
            window.location.search.substr(1)
        );

        if (tokenResult.t) {
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
                <p>登录成功，窗口即将关闭……</p>
            </div>
        );
    }
}


export default Callback as ComponentClass;
