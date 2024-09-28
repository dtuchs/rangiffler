import {createContext} from "react";
import {User} from "../types/User";

interface SessionContextInterface {
    updateUser: () => void;
    user?: User;
}

const defaultState = {
    updateUser: () => {
    },
    user: undefined,
};

export const SessionContext = createContext<SessionContextInterface>(defaultState);

