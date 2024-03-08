import {gql, useQuery} from "@apollo/client";
import {User} from "../types/User";

// const GET_USER = gql`
//     query GetUser() {
//         user() {
//             data {
//                 id
//                 username
//                 firstname
//                 surname
//                 avatar
//                 location
//             }
//         }
//     }
// `

export const useGetUser = ():  undefined => {
    // const {data} = useQuery(GET_USER);
    // return data?.user?.data;
}