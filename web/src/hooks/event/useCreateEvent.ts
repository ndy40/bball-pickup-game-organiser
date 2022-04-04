/* eslint-disable no-console */
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { create, CreateEventInput } from 'services/EventService';

export default function useCreateEvent() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation((data: CreateEventInput) => create(data), {
        onError: (error: any) => {
            toast.error(error.response.data.detail[0].msg);
        },
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            navigate('/events');
            toast.success('Event created successsfully');
        },
    });
    return mutate;
}
