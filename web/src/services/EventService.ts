import { httpClient } from "./httpClient";


const PATH = "/events"

interface Player {
    player_id: string;
    avatar: string;
}

export interface Event {
    _id: string;
    title:string;
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
    title:string;
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
    return await httpClient.get<Event[]>(`${PATH}/?${queryString}`);
}

export const create = async (data: CreateEventInput) => {
    return await httpClient.post(`${PATH}`, data);
}

export const join = async (event_id: string) => {
    return await httpClient.patch(`${PATH}/${event_id}/join`,);
}

export const remove = async (event_id: string) => {
    return await httpClient.delete(`${PATH}/${event_id}`,);
}
export const leave = async (event_id: string) => {
    return await httpClient.patch(`${PATH}/${event_id}/leave`,);
}


















