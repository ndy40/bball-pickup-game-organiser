import { useMutation, useQueryClient } from 'react-query';
import { join } from 'services/EventService';
import toast from 'react-hot-toast';

export default function useJoinEvent() {
    const queryClient = useQueryClient();
    return useMutation((id: string) => join(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            toast.success('Event joined successsfully');
        },
    });
}
