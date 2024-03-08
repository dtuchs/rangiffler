import { Country } from "./Country";

export type User = {
    username: string;
    location: Country;
    name?: string;
    surname?: string;
    avatar?: string;
    visitedCountries?: number;
}