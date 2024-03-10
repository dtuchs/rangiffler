import { gql, useMutation } from "@apollo/client";

interface FriendshipInput {
    variables: {
        input: {
            user: string,
            action: "ADD" | "ACCEPT" | "REJECT" | "DELETE",
        }
    }
}

const ADD_FRIEND = gql(`
      mutation AddFriend($input: FriendshipInput!) {
            friendship(input: $input) {
                id
                username
                friendStatus
            }
       }
`);

type UpdateFriendshipRequestType = {
    onError: () => void,
    onCompleted: () => void,
}

type UpdateFriendshipReturnType = {
    updateFriendship: (updateUserInput: FriendshipInput) => void,
    loading: boolean,
}
export const useUpdateFriendshipStatus = (req: UpdateFriendshipRequestType): UpdateFriendshipReturnType => {
    const [updateFriendship, {loading}] = useMutation(ADD_FRIEND, {
        onError: req.onError,
        onCompleted: req.onCompleted,
    });
    return {updateFriendship, loading};
};