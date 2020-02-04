export const getAccessToken = () =>
    JSON.parse(window.localStorage.getItem("gatsbyAccessToken"))

export const setAccessToken = (token: string) => window.localStorage.setItem('gatsbyAccessToken', JSON.stringify(token))