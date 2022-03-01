import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { FetchEventsInput, getAll } from 'services/EventService';

export default function useFetchEvents() {
    return useMutation((data: FetchEventsInput) => getAll(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg);
        },
    });
}
