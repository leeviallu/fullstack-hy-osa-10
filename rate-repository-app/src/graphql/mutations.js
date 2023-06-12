import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
    mutation Mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;
