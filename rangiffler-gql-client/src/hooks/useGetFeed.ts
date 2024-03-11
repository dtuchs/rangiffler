import {gql, useQuery} from "@apollo/client";

const GET_FEED = gql(`
    query GetFeed($page: Int, $size: Int, $withFriends: Boolean!) {
        feed(withFriends: $withFriends) {
            photos(page: $page, size: $size) {
                edges {
                    node {
                         id
                        src
                        country {
                            code
                            name
                            flag
                        }
                        description
                        likes {
                            total
                            likes {
                                user 
                            }
                        }
                    }
                }
                pageInfo {
                    hasPreviousPage
                    hasNextPage
                }        
            }
             stat {
                count
                country {
                    code
                }
            }    
        }
    }
`);

type getFeedRequestType = {
    page: number,
    withFriends: boolean,
}
export const useGetFeed = (req: getFeedRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_FEED, {
        variables: {
            withFriends: req.withFriends,
            page: req.page ?? 0,
            size: 10,
        }});
    return {
        photos: data?.feed?.photos?.edges?.map((e: any) => e?.node) ?? [],
        stat: data?.feed?.stat,
        hasPreviousPage: data?.feed?.photos?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.feed?.photos?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}