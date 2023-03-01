import { createContext } from "react";
import { User } from "../../types/types";

interface UserContextInterface {
    user: Partial<User>;
    handleChangeUser: (user: User) => void;
}

const defaultState = {
    user: {
     username: "",
     firstname: "",
     lastName: "",
    },
    handleChangeUser: (user: User) => {},
};

export const UserContext = createContext<UserContextInterface>(defaultState);

