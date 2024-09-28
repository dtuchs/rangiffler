import {gql, useQuery} from "@apollo/client";

const GET_FRIENDS = gql(`
    query GetFriends($page: Int, $size: Int, $searchQuery: String) {
        user {
            friends(page: $page, size: $size, searchQuery: $searchQuery) {
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
    }
`);

type getFriendsRequestType = {
    page: number,
    search: string,
}
export const useGetFriends = (req: getFriendsRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_FRIENDS, {
        variables: {
            page: req.page ?? 0,
            size: 10,
            searchQuery: req.search ?? "",
        }
    });
    return {
        data: data?.user?.friends?.edges?.map((e: any) => e?.node) ?? [],
        hasPreviousPage: data?.user?.friends?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.user?.friends?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}