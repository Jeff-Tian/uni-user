const isBrowser = typeof window === 'object'

const inMemoryStorage: Record<string, string> = {};
class InMemoryStore {
    static getItem = (key: string) => inMemoryStorage[key] ?? null
    static setItem = (key: string, value: string) => inMemoryStorage[key] = value
}

const store = isBrowser ? window.localStorage : InMemoryStore;

export const getAccessToken = () =>
    JSON.parse(store.getItem("gatsbyAccessToken"))

export const setAccessToken = (token: string) => store.setItem('gatsbyAccessToken', JSON.stringify(token))