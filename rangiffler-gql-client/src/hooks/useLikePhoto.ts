import {gql, useMutation} from "@apollo/client";

interface PhotoInput {
    variables: {
        input: {
            id: string,
            like: {
                user: string
            }
        }
    }
}

const LIKE_PHOTO = gql(`
    mutation LikePhoto($input: PhotoInput!) {
        photo(input: $input) {
            id
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
`);

type LikePhotoRequestType = {
    onError: () => void,
    onCompleted: () => void,
}

type LikePhotoReturnType = {
    likePhoto: (updateUserInput: PhotoInput) => void,
    loading: boolean,
}

export const useLikePhoto = (req: LikePhotoRequestType): LikePhotoReturnType => {
    const [likePhoto, {loading}] = useMutation(LIKE_PHOTO, {
        onError: req.onError,
        onCompleted: req.onCompleted,
    });
    return {likePhoto, loading};
};