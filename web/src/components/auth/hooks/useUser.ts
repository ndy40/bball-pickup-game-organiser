import { useRecoilValue } from "recoil"
import { state } from "app/auth"

export const useUser = () => {
    const data = useRecoilValue(state)
    return data.user
}