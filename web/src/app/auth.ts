import { atom } from 'recoil';

export interface IState {
    user: {
        id: string
        avatar: string
        username: string
        first_seen: string

    } | null
}

export const state = atom<IState>({
    key: 'auth',
    default: {
        user: null,
    },
});
