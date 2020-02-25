import querystring from "querystring";
import { UniUser } from "../user";

const w = window.parent ?? window;

export const popupLogin = () => {
    const query = querystring.parse(w.location.search.substr(1));

    const tokenResult: any = this.props.tokenResult || { token: query.t };

    if (tokenResult.token) {
        UniUser.loginByToken()(tokenResult).then(
            async (returnObj: any) => {
                const returnPath = w.localStorage.getItem("returnPath");
                if (returnPath) {
                    w.location.href = returnPath;
                    w.localStorage.setItem("returnPath", "");
                } else {
                    w.location.href = returnObj;
                }
            }
        );
    }
}

export const handleCallback = () => {
    if (w.opener) {
        w.opener.postMessage(w.location.search, w.location.origin);
    }

    popupLogin();
}