import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { RepositoryInfo } from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState();
    let orders = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
    };
    if (selectedLanguage == "LATEST") {
        orders = {
            orderBy: "CREATED_AT",
            orderDirection: "DESC",
        };
    }
    if (selectedLanguage == "HIGHEST_RATED") {
        orders = {
            orderBy: "RATING_AVERAGE",
            orderDirection: "DESC",
        };
    }
    if (selectedLanguage == "LOWEST_RATED") {
        orders = {
            orderBy: "RATING_AVERAGE",
            orderDirection: "ASC",
        };
    }

    const { repositories, loading } = useRepositories(orders);
    if (loading) return null;

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) =>
                        setSelectedLanguage(itemValue)
                    }
                    style={{
                        backgroundColor: "white",
                        marginVertical: 15,
                    }}
                >
                    <Picker.Item label="Latest repositories" value="LATEST" />
                    <Picker.Item
                        label="Highest rated repositories"
                        value="HIGHEST_RATED"
                    />
                    <Picker.Item
                        label="Lowest rated repositories"
                        value="LOWEST_RATED"
                    />
                </Picker>
            )}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`/${item.id}`)}>
                    <RepositoryInfo repository={item} />
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default RepositoryList;
