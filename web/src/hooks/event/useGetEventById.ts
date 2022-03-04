import { useQuery } from 'react-query';
import { getEventById } from '../../services/EventService';

export default function useGetEventById(eventId: string) {
    return useQuery(['event', eventId], () => getEventById(eventId), { retry: false, onError: () => null });
}
