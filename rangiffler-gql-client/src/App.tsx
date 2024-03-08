import "./App.css";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { apiClient } from "./api/apollo-client";
import { SessionContext } from "./context/SessionContext";
import { User } from "./types/User";
import { AppContent } from "./components/AppContent";


function App() {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeUser = (user: User) => {
        setUser(user);
    };

    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.pathname === "/authorized") {
            return;
        }
    }, []);
    
    return (
        <ApolloProvider client={apiClient}>
            <SessionContext.Provider value={{
                handleChangeUser,
                user,
                isLoading,
            }}>
              <AppContent/>
            </SessionContext.Provider>
        </ApolloProvider>
    )
}

export default App;
