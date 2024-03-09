import {gql, useQuery} from "@apollo/client";

const GET_USER = gql(`
    query GetUser {
        user {
            id
            username
            firstname
            surname
            avatar
            location {
                code
                name
            }
        }
    }
`);

export const useGetUser = () => {
    const {data, loading, error, refetch} = useQuery(GET_USER);
    return {
        data,
        loading,
        error,
        refetch,
    };
}