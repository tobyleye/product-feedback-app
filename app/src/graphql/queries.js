import { gql } from "@apollo/client"

export const greetings = gql`
    query {
        greetings
    }
`

export const fetchFeedbackList = gql`
    query {
        feedbackRequests {
            id,
            title,
            detail,
            category,
            status,
            upvotes,
            createdAt,
            user {
                fullname,
                email,
                username,
                createdAt
            }
        }
    }
`

export const fetchFeedback = gql`
    query fetchSingleFeedback($id: String!) {
        feedbackRequest(id: $id) {
            id,
            title,
            detail,
            category,
            status,
            upvotes,
            createdAt,
            user {
                fullname,
                email,
                username,
                createdAt
            },
            comments {
                id,
                content,
                user {
                    id,
                    fullname
                }
            }
        }
    }
`