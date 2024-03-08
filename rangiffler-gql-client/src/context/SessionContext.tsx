import {createContext} from "react";
import { User } from "../types/User";

interface SessionContextInterface {
    handleChangeUser: (user: User) => void;
    user?: User;
    isLoading: boolean;
}

const defaultState = {
    handleChangeUser: () => {
    },
    user: undefined,
    isLoading: false,
};

export const SessionContext = createContext<SessionContextInterface>(defaultState);

