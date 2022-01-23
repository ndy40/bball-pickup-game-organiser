import { useMutation, useQuery, useQueryClient } from 'react-query';
import { login, register, profile } from 'services/UserService';
import { removeToken } from "services/local-storage"
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { state as AuthState } from "app/auth"
import { setToken } from '../../../services/local-storage';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from "../../../react-query/constant"

export const useLogin = () => {
    const { mutate } = useMutation((username: string) => login(username), {
        onSuccess: (data) => {
            console.log(data)
            setToken(data.data.access_token)
            window.location.assign("/")
        },
    });
    return mutate
}

export const useRegister = () => {
    const navigate = useNavigate()
    const { mutate } = useMutation((username: string) => register(username), {
        onSuccess: () => {
            toast.success("Registration successful")
            navigate("/login")
        }
    })
    return mutate
}


export const useCheckSignedInUser = () => {
    const setState = useSetRecoilState(AuthState)
    useQuery(queryKeys.profile, profile, {
        retry: false,
        onSuccess: (data) => {
            setState(() => ({ user: { ...data.data } }))
        },
        onError: () => {
        },

    })


}

export const useAuthHooks = () => {

    const state = useRecoilValue(AuthState)
    const queryClient = useQueryClient()

    const logout = () => {
        removeToken()
        queryClient.removeQueries([queryKeys.profile])
        window.location.assign("/")

    }

    return { logout, state }

}

