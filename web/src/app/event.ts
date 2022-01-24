import { atom } from "recoil"
import { Event } from "../services/EventService"

export const state = atom<Event[]>({
    key: "events",
    default: []
})

