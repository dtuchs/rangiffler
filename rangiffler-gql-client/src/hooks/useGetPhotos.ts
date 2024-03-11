import {gql, useQuery} from "@apollo/client";

const GET_PHOTOS = gql(`
    query GetPhotos($page: Int, $size: Int, $withFriends: Boolean!) {
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
        }
    }
`);

type getPhotosRequestType = {
    page: number,
    withFriends: boolean,
}
export const useGetPhotos = (req: getPhotosRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_PHOTOS, {
        variables: {
            withFriends: req.withFriends,
            page: req.page ?? 0,
            size: 10,
        }});
    return {
        data: data?.feed?.photos?.edges?.map((e: any) => e?.node) ?? [],
        hasPreviousPage: data?.feed?.photos?.pageInfo?.hasPreviousPage,
        hasNextPage: data?.feed?.photos?.pageInfo?.hasNextPage,
        loading,
        error,
        refetch,
    };
}