import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { state as EventState } from '../../../app/event'
import { FetchEventsInput, getAll } from '../../../services/EventService';;

export const useFetchEvents = () => {
    const setState = useSetRecoilState(EventState)
    const { mutate } = useMutation((data: FetchEventsInput) => getAll(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg)
        },
        onSuccess: (data) => setState((prev) => data.data)
    })
    return mutate
}

