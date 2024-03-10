import {gql, useQuery} from "@apollo/client";

const GET_COUNTRIES = gql(`
    query GetCountries {
        countries {
            code
            name
            flag
        }
    }
`);

export const useGetCountries = () => {
    const {data, loading, error, refetch} = useQuery(GET_COUNTRIES);
    return {
        data,
        loading,
        error,
        refetch,
    };
}