/* eslint-disable require-await */
import httpClient from './httpClient';

const PATH = '/events';
interface Player {
    player_id: string;
    avatar: string;
}
export interface Event {
    id: string;
    title: string;
    session_date: Date;
    created_at: Date;
    invite_code: string;
    invite_link: string;
    organiser_id: string;
    organiser_name: string;
    venue: string;
    notes: string;
    max_players: number;
    cost: number;
    players: Player[];
}
export interface CreateEventInput {
    session_date: Date;
    created_at: Date;
    venue: string;
    notes: string;
    max_players: number;
    title: string;
    cost: number;
}
export interface FetchEventsInput {
    organiser_id?: string
    invite_code?: string
    player_id?: string
    filter__session_date__gte?: string
}
export const getAll = async (data: FetchEventsInput) => {
    const queryString = new URLSearchParams(data as string).toString();
    return httpClient.get<Event[]>(`${PATH}/?${queryString}`);
};
export const create = async (data: CreateEventInput) => httpClient.post(`${PATH}`, data);
export const join = async (eventId: string) => httpClient.patch(`${PATH}/${eventId}/join`);
export const remove = async (eventId: string) => httpClient.delete(`${PATH}/${eventId}`);
export const leave = async (eventId: string) => httpClient.patch(`${PATH}/${eventId}/leave`);
export const getEventById = async (eventId: string) => httpClient.get(`${PATH}/${eventId}`)
