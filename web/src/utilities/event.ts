/* eslint-disable max-len */
import moment from 'moment';
import { Event } from 'services/EventService';

export const slotsAvailable = (totalPlayers: number, playersAttending: number) => totalPlayers - playersAttending;
export const eventStatus = (date: Date) => moment(Date.now()).diff(moment(new Date(date)), 'day');
export const findPlayerInEvent = (id: string, event: Event) => event.players.find(
    (player) => player.player_id === id,
);

export const sortEventByClosestDate = (event: Event[]) => event.sort((a, b) => +new Date(a.session_date) - +new Date(b.session_date));
