import { useQueryClient } from "react-query"
import { removeToken } from "services/local-storage"
import { queryKeys } from "../../../react-query/constant"

export const useLogout = () => {
    const queryClient = useQueryClient()
    const logout = () => {
        removeToken()
        queryClient.removeQueries([queryKeys.profile])
        window.location.assign("/")
    }
    return logout
}

