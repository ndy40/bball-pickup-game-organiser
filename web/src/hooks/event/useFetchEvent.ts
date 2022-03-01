import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import EventState from 'app/event';
import { FetchEventsInput, getAll } from 'services/EventService';

export default function useFetchEvents() {
    const setState = useSetRecoilState(EventState);
    return useMutation((data: FetchEventsInput) => getAll(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg);
        },
        onSuccess: (data) => setState(data.data),
    });
}
