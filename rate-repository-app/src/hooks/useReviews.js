import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useReviews = (repositoryId) => {
    const { data, loading } = useQuery(GET_REPOSITORY_REVIEWS, {
        fetchPolicy: "cache-and-network",
        variables: { repositoryId },
    });
    const reviews = loading ? undefined : data.repository.reviews.edges;
    return { reviews, loading };
};

export default useReviews;
