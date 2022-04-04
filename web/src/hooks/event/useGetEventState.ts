import { Event } from 'services/EventService';
import {
    eventStatus,
    slotsAvailable,
    findPlayerInEvent,
} from 'utilities/event';
import { useUser } from '../../context/auth/auth';

export default function useGetEventState(event: Event) {
    const { user } = useUser();
    /* conditon checking variables */
    const availableSlots = slotsAvailable(
        event?.max_players,
        event?.players.length,
    );

    /* get the number of days from current date till event date */
    const dateDiff = eventStatus(event.session_date);

    /* gets the color of an event depending on its session date from current date */
    const eventTimeColor =
        dateDiff === 0 ? 'bg-blue-500' : dateDiff < 0 ? 'bg-green-500' : 'bg-red-500 ';

    /* check if event is int the past or no slots available */
    const canJoinEvent = availableSlots !== 0 && dateDiff <= 0;

    /* check if a user is attending an event or not */
    const isAttending = findPlayerInEvent(user?.id, event);

    /* check is a user owns an event */
    const isOwner = event.organiser_id === user?.id;

    return { availableSlots, dateDiff, canJoinEvent, isAttending, isOwner, eventTimeColor }
}
