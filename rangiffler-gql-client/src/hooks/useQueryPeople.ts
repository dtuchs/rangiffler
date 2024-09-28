import {gql, useQuery} from "@apollo/client";

const GET_PEOPLE = gql(`
    query GetPeople($page: Int, $size: Int, $searchQuery: String) {
        users(page: $page, size: $size, searchQuery: $searchQuery) {
            edges {
                node {
                    id
                    username
                    firstname
                    surname
                    avatar
                    location {
                        code
                        name
                        flag
                    }
                    friendStatus
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
            }
       }
    }
`);

type getPeopleRequestType = {
    page: number,
    search: string,
}

export const useQueryPeople = (req: getPeopleRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_PEOPLE, {
        variables: {
            page: req.page ?? 0,
            size: 10,
            searchQuery: req.search ?? "",
        }
    });

    return {
        data: data?.users?.edges?.map((e: any) => e?.node) ?? [],
        hasPreviousPage: data?.users?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.users?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}