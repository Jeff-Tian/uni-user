import proxyFetch from '../helpers/proxyFetch';
import { getAccessToken } from '../helpers/storage';

const fetchInstance = proxyFetch.getInstance();

const proxy = url => (params, settings?) => fetchInstance.post(url, params, settings);

export const getProfile = async () => {
    const res = await fetch("https://sso.jiwai.win/profile", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    })

    if (res.status !== 200) {
        throw res;
    }

    return await res.json()
}
