import proxyFetch from '../helpers/proxyFetch';
import { getAccessToken } from '../helpers/getAccessToken';

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

    return await res.json()
}
