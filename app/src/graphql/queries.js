import { gql } from "@apollo/client"

export const greetings = gql`
    query {
        greetings
    }
`