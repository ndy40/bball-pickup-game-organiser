import { useMutation, useQueryClient } from 'react-query';
import { leave } from 'services/EventService';
import toast from 'react-hot-toast';

export default function useLeaveEvent() {
    const queryClient = useQueryClient();
    return useMutation((id: string) => leave(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            toast.success('Event left successfully');
        },
    });
}
