import { useMutation, useQueryClient } from 'react-query';
import { join } from 'services/EventService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useJoinEvent() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation((id: string) => join(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            toast.success('Event joined successsfully');
            navigate('/events');
        },
    });
}
