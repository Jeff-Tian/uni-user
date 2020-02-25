import querystring from "querystring";
import { UniUser } from "../user";

const w = window.parent ?? window;

const notifyOpener = () => {
    if (w.opener) {
        w.opener.postMessage(w.location.search, w.location.origin);
    }
}

const redirectBack = (returnUrl: string) => {
    const returnPath = w.localStorage.getItem("returnPath");
    if (returnPath && w.location.pathname !== returnPath) {
        w.location.href = returnPath;
        w.localStorage.setItem("returnPath", "");
    }
    else {
        w.location.href = returnUrl;
    }
}

export const handleCallback = () => {
    const query = querystring.parse(w.location.search.substr(1));

    const tokenResult: any = { token: query.t };

    if (tokenResult.token) {
        UniUser.loginByToken(console.log)(tokenResult).then(
            async (returnUrl: any) => {
                console.log('loginByToken 成功：', returnUrl);

                notifyOpener();

                redirectBack(returnUrl);
            }
        );
    }
}
