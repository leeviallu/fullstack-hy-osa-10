import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { RepositoryItemContainer } from "./RepositoryItem";

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
                    <RepositoryItemContainer item={item} />
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();
    if (loading) return null;
    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
