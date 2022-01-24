import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { create } from "services/EventService"
import { CreateEventInput, FetchEventsInput, getAll } from '../../../services/EventService';
import { state as EventState } from '../../../app/event';
import { Event } from "../../../services/EventService"


export const useCreateForm = () => {
    const navigate = useNavigate()
    const { mutate } = useMutation((data: CreateEventInput) => create(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg)
        },
        onSuccess: () => {
            toast.success("Event created Successfully")
            navigate("/")
        }
    })

    return mutate
}

export const useFetchEvents = () => {
    const setState = useSetRecoilState(EventState)
    const { mutate } = useMutation((data: FetchEventsInput) => getAll(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg)
        },
        onSuccess: (data) => {
            const response: Event[] = data.data
            setState((prev) => response)
        }
    })

    return mutate

}

export const useEvents = () => {
    const state = useRecoilValue(EventState)
    return state
}