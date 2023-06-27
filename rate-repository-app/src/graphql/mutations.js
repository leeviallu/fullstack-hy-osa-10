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
            rating
            text
            repositoryId
            repository {
                ownerName
                name
            }
        }
    }
`;
