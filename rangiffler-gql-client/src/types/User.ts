import { Country } from "./Country";

export type User = {
    username: string;
    location: Country;
    firstname?: string;
    surname?: string;
    avatar?: string;
    visitedCountries?: number;
}