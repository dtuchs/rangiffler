import {gql, useQuery} from "@apollo/client";

const GET_OUTCOME_INVITATIONS = gql(`
    query GetOutcomeInvitations($page: Int, $size: Int, $searchQuery: String) {
        user {
            outcomeInvitations(page: $page, size: $size, searchQuery: $searchQuery) {
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

type getInvitationsRequestType = {
    page: number,
    search: string,
}
export const useGetOutcomeInvitations = (req: getInvitationsRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_OUTCOME_INVITATIONS, {
        variables: {
            page: req.page ?? 0,
            size: 10,
            searchQuery: req.search ?? ""
        }
    });
    return {
        data: data?.user?.outcomeInvitations?.edges?.map((e: any) => e?.node) ?? [],
        hasPreviousPage: data?.user?.outcomeInvitations?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.user?.outcomeInvitations?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}