import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orders) => {
    const { orderBy, orderDirection, searchKeyword } = orders;
    const { data, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables: {
            orderBy,
            orderDirection,
            searchKeyword,
        },
    });

    const repositories = loading ? undefined : data.repositories;

    return { repositories, loading };
};

export default useRepositories;
