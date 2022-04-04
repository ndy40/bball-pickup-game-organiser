import { useQuery } from 'react-query';
import { Event, FetchEventsInput, getAll } from 'services/EventService';
import moment from 'moment';

export default function useFetchEvents(value: FetchEventsInput) {
    return useQuery('events', () => getAll(value), {
        staleTime: 60000 * 30,
        cacheTime: 60000 * 35,
        select: (data) => () => {
            const upcoming: Event[] = [];
            const previous: Event[] = [];
            const today: Event[] = [];
            const events = data.data.sort(
                (a, b) => +new Date(b.session_date) - +new Date(a.session_date),
            );
            events.forEach((event) => {
                const noOfDays = moment(new Date()).diff(moment(event.session_date), 'days');
                if (noOfDays === 0) {
                    today.push(event);
                }
                if (noOfDays > 0) {
                    previous.push(event);
                }
                if (noOfDays < 0) {
                    upcoming.push(event);
                }
            });
            return { upcoming, previous, today };
        },
    });
}
