import { gql, useMutation } from "@apollo/client";

interface PhotoInput {
    variables: {
        input: {
            id: string,
            description: string,
            country: {
                code: string,
            }
        }
    }
}

const CREATE_PHOTO = gql(`
    mutation UpdatePhoto($input: PhotoInput!) {
        photo(input: $input) {
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
            }
        }
    }
`);

type UpdatePhotoRequestType = {
    onError: () => void,
    onCompleted: () => void,
}

type UpdatePhotoReturnType = {
    updatePhoto: (updatePhotoInput: PhotoInput) => void,
    loading: boolean,
}

export const useCreatePhoto = (req: UpdatePhotoRequestType) : UpdatePhotoReturnType => {
    const [updatePhoto, {loading}] = useMutation(CREATE_PHOTO, {
        onError: req.onError,
        onCompleted: req.onCompleted,
    });
    return {updatePhoto, loading};
};