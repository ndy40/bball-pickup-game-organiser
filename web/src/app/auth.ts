import { atom, } from "recoil"

export interface IState {
    user: {
        id: string
        avatar: string
        username: string
        first_seen: string
<<<<<<< HEAD
    } | null
}
=======

    } | null
}

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
export const state = atom<IState>({
    key: "auth",
    default: {
        user: null
    }
})

