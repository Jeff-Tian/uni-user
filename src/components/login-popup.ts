import Taro from "@tarojs/taro-h5";
import querystring from "querystring";
import { loggedIn, login, loginCancelled, setUser } from "../redux/actions/login";

export const popupHtml = `<html>
  <head>
    <title>第三方登录 我的个人中心</title>
  </head>
  <body>
    <p>正在加载中, 请稍等 ……</p>
    <script>
      window.addEventListener(
        "message",
        function(event) {
          console.log(event.data);

          if (
            event.data.indexOf("http://") === 0 ||
            event.data.indexOf("https://") === 0 ||
            event.data.indexOf("//") === 0
          ) {
            window.location.href = event.data;
          }
        },
        false
      );

      window.opener.postMessage("listenerLoaded", window.location.origin);
    </script>
  </body>
</html>
`;

export default (win, ssoUrl) => {
    let popup: any = null;

    function popupLogic() {
        try {
            // @ts-ignore
            // eslint-disable-next-line no-unused-vars
            const link = popup.location.href;
        } catch (ex) {
            console.error("打开子窗口失败：", ex);
            popup.close();
            win.alert("之前打开的窗口已关闭, 请重新点击并在新打开的窗口中重试。");
        } finally {
            if (popup) {
                popup.postMessage(
                    ssoUrl,
                    win.location.origin
                );
            }
        }
    }

    return dispatch => {
        Taro.setStorageSync("returnPath", win.location.pathname);
        dispatch(login());

        const interval = setInterval(() => {
            if (!popup) {
                clearInterval(interval);
                return;
            }

            if (popup.closed) {
                console.log("login cancelled!");
                dispatch(loginCancelled());
                clearInterval(interval);
            }
        }, 1000);

        if (!popup || popup.closed) {
            popup = win.open();

            if (popup) {
                popup.document.write(popupHtml);
            }
        }

        win.addEventListener(
            "message",
            async function (event) {
                console.log("event = ", event);
                if (event.origin !== win.location.origin) {
                    return;
                }

                if (!event.data) {
                    // Ignore the redirecting messages.
                    return;
                }

                if (event.data === "listenerLoaded") {
                    return popupLogic();
                }

                if (typeof event.data === "string" && event.data.indexOf("?") === 0) {
                    let tokenResult = querystring.parse(event.data.substr(1));

                    tokenResult = { ...tokenResult, token: tokenResult.token ?? tokenResult.t };
                    console.log(tokenResult);

                    if (tokenResult.token) {
                        dispatch(loggedIn(tokenResult.token));

                        try {
                            const userInfo = await Taro.request({
                                url: "https://uniheart.pa-ca.me/jwt/user",
                                header: {
                                    Authorization: "Bearer " + tokenResult.token
                                },
                                method: "GET"
                            });

                            dispatch(setUser(userInfo.data));

                            let returnPath = Taro.getStorageSync("returnPath");
                            console.log("即将跳转到：", returnPath);
                            await Taro.navigateTo({
                                url: returnPath,
                                success: () => Taro.removeStorageSync("returnPath")
                            });
                        } catch (ex) {
                            console.error(ex);
                        }
                    }

                    console.log('popup = ', popup, popup.location);
                    console.log('eventSource = ', event.source, event.source.location);

                    clearInterval(interval);

                    console.log('登录完成，结果是: ', tokenResult);
                    return (popup || event.source).close();
                }
            },
            false
        );

        popupLogic();
    };
}