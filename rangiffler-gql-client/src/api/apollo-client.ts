import {ApolloClient, InMemoryCache} from "@apollo/client";

const BASE_URL = `${import.meta.env.VITE_FRONT_URL}`;

export const apiClient = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
});