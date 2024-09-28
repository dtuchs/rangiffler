import {gql, useMutation} from "@apollo/client";
import {GET_FEED} from "./useGetFeed.ts";

interface DeletePhotoInput {
    variables: {
        id: string;
    }
}

const DELETE_PHOTO = gql(`
    mutation DeletePhoto($id: ID!) {
        deletePhoto(id: $id) 
    }
`);

type DeletePhotoRequestType = {
    onError: () => void,
    onCompleted: () => void,
    page: number,
    withFriends: boolean,
}

type DeletePhotoReturnType = {
    deletePhoto: (data: DeletePhotoInput) => void,
    loading: boolean,
}

export const useDeletePhoto = (req: DeletePhotoRequestType): DeletePhotoReturnType => {
    const [deletePhoto, {loading}] = useMutation(DELETE_PHOTO, {
        onError: req.onError,
        onCompleted: req.onCompleted,
        refetchQueries: [{
            query: GET_FEED,
            variables: {
                withFriends: req.withFriends,
                page: req.page ?? 0,
                size: 12,
            }
        }, "GetFeed"],
    });
    return {deletePhoto, loading};
};