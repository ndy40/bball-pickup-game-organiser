import { atom } from 'recoil';
import { Event } from '../services/EventService';

export default atom<Event[]>({
    key: 'events',
    default: [],
});
