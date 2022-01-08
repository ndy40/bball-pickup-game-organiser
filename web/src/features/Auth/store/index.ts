import { atom, } from "recoil"

export interface IState {
    isLoggedIn: boolean,
    user: {
        avatar: string
        username: string
    } | undefined
}

export const state = atom<IState>({
    key: "auth",
    default: {
        isLoggedIn: false,
        user: undefined
    }
})

