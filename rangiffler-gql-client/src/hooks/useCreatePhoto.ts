import { gql } from "@apollo/client";

const CREATE_PHOTO = gql(`
    mutation CreatePhoto($input: CreatePhotoInput!) {
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