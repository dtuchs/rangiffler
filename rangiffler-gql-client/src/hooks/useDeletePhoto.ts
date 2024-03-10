import { gql, useMutation } from "@apollo/client";

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
}

type DeletePhotoReturnType = {
    deletePhoto: (data: DeletePhotoInput) => void,
    loading: boolean,
}

export const useDeletePhoto = (req: DeletePhotoRequestType) : DeletePhotoReturnType => {
    const [deletePhoto, {loading}] = useMutation(DELETE_PHOTO, {
        onError: req.onError,
        onCompleted: req.onCompleted,
    });
    return {deletePhoto, loading};
};