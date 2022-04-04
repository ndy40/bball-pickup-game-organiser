import { useMutation, useQueryClient } from 'react-query';
import { leave } from 'services/EventService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLeaveEvent() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation((id: string) => leave(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries(['events']);
            toast.success('Event left successfully');
            navigate('/events');
        },
    });
}
