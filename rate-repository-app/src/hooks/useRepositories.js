import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
    const { data, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
    });

    const repositories = loading ? undefined : data.repositories;

    return { repositories, loading };
};

export default useRepositories;
