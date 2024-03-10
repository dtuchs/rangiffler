import {gql, useQuery} from "@apollo/client";

const GET_INVITATIONS = gql(`
    query GetInvitations($page: Int, $size: Int) {
        user {
            incomeInvitations(page: $page, size: $size) {
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
    page: number
}
export const useGetInvitations = (req: getInvitationsRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_INVITATIONS, {
        variables: {
            page: req.page ?? 0,
            size: 10,
        }});
    return {
        data: data?.user?.incomeInvitations?.edges?.map((e: any) => e?.node) ?? [],
        hasPreviousPage: data?.user?.incomeInvitations?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.user?.incomeInvitations?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}