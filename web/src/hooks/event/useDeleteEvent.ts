import { useMutation, useQueryClient } from 'react-query';
import { remove } from 'services/EventService';
import toast from 'react-hot-toast';

export default function useDeleteEvent() {
    const queryClient = useQueryClient();
    return useMutation((id: string) => remove(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            toast.success('Event deleted successsfully');
        },
    });
}
