import gql from "graphql-tag";

export const signup = gql`
    mutation signup($email: String!, $username: String!, $password: String!, $fullname: String!) {
        signup(
            email: $email, 
            password: $password, 
            username: $username,
            fullname: $fullname
        ) {
            id,
        }
    }
`

export const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id,
            fullname,
            username
        }
    }
`