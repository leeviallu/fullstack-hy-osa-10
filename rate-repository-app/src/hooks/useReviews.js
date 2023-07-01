import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useReviews = (repositoryId, first) => {
    const variables = {
        repositoryId,
        first,
    };
    const { data, loading, fetchMore, ...result } = useQuery(
        GET_REPOSITORY_REVIEWS,
        {
            fetchPolicy: "cache-and-network",
            variables,
        }
    );

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {
        reviews: data?.repository.reviews.edges,
        loading,
        fetchMore: handleFetchMore,
        ...result,
    };
};

export default useReviews;
