import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
    mutation Mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const REVIEW_REPOSITORY = gql`
    mutation Mutation($review: CreateReviewInput) {
        createReview(review: $review) {
            repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation Mutation($user: CreateUserInput) {
        createUser(user: $user) {
            username
            createdAt
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation Mutation($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;
