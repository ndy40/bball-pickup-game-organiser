import { useRecoilValue } from "recoil"
import { state as EventState } from '../../../app/event'

export const useEvents = () => {
    const state = useRecoilValue(EventState)
    return state
}