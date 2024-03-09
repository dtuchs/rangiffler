import {ApolloClient, InMemoryCache} from "@apollo/client";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const apiClient = new ApolloClient({
    uri: `${BASE_URL}/graphql`,
    headers: {
         "Authorization": localStorage.getItem("id_token") ? `Bearer ${localStorage.getItem("id_token")}` : "",
    },
    cache: new InMemoryCache(),
});