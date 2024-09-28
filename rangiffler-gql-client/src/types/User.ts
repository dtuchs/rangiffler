import {Country} from "./Country";

export type User = {
    id: string;
    username: string;
    location: Country;
    firstname?: string;
    surname?: string;
    avatar?: string;
    friendStatus?: "FRIEND" | "INVITATION_SENT" | "INVITATION_RECEIVED";
}