import { gql } from "@apollo/client";

export const greetings = gql`
  query {
    greetings
  }
`;

export const fetchFeedbackList = gql`
  query {
    feedbackRequests {
      id
      title
      detail
      category
      status
      upvotes
      createdAt
      comments {
        id
      }
      user {
        fullname
        email
        username
        createdAt
      }
    }
  }
`;

export const fetchFeedback = gql`
  query fetchSingleFeedback($id: String!) {
    feedbackRequest(id: $id) {
      id
      title
      detail
      category
      status
      upvotes
      createdAt
      user {
        id
      }
      comments {
        id
        content
        user {
          fullname
          email
          username
        }
        replies {
          id
          user { 
            fullname
            email
            username
          }
          reply
        }
      }
    }
  }
`;

export const fetchCurrentUser = gql`
  query {
    currentUser {
      id
      fullname
      email
      username
      createdAt
    }
  }
`;
