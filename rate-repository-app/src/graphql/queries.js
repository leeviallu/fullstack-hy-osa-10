import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $first: Int
        $after: String
    ) {
        repositories(
            first: $first
            after: $after
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            totalCount
            edges {
                node {
                    id
                    ownerAvatarUrl
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            url
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY_REVIEWS = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;
