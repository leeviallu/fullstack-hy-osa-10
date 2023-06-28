import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { RepositoryInfo } from "./RepositoryItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const navigate = useNavigate();
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`/${item.id}`)}>
                    <RepositoryInfo repository={item} />
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

const RepositoryList = () => {
    const orders = {
        orderBy: "CREATED_AT",
        orderDirection: "ASC",
    };
    const { repositories, loading } = useRepositories(orders);
    if (loading) return null;
    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
