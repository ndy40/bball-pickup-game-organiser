export const LOCALSTORAGEKEY = 'bball';
export function getToken() {
    return window.localStorage.getItem(LOCALSTORAGEKEY) || '';
}
export function removeToken() {
    window.localStorage.removeItem(LOCALSTORAGEKEY);
}
export function setToken(token: string) {
    window.localStorage.setItem(LOCALSTORAGEKEY, token);
}
