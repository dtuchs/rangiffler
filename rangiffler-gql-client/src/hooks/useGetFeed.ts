import {gql, useQuery} from "@apollo/client";

const GET_FEED = gql(`
    query GetFeed( $withFriends: Boolean!) {
        feed(withFriends: $withFriends) {
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
    withFriends: boolean,
}
export const useGetFeed = (req: getFeedRequestType) => {
    const {data, loading, error, refetch} = useQuery(GET_FEED, {
        variables: {
            withFriends: req.withFriends,
        }});
    return {
        data: data?.feed?.stat,
        loading,
        error,
        refetch,
    };
}