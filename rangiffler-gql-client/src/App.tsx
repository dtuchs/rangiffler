import "./App.css";
import {ApolloProvider} from "@apollo/client";
import {AppContent} from "./components/AppContent";
import {apiClient} from "./api/apolloClient";
import {SnackBarProvider} from "./context/SnackBarContext";


const App = () => {

    return (
        <ApolloProvider client={apiClient}>
            <SnackBarProvider>
                <AppContent/>
            </SnackBarProvider>
        </ApolloProvider>
    )
}

export default App;
