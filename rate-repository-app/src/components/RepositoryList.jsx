import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { RepositoryInfo } from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [value] = useDebounce(searchKeyword, 500);

    let repositoryArgs = {
        searchKeyword: value,
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
    };
    if (selectedLanguage == "LATEST") {
        repositoryArgs = {
            ...repositoryArgs,
            orderBy: "CREATED_AT",
            orderDirection: "DESC",
        };
    }
    if (selectedLanguage == "HIGHEST_RATED") {
        repositoryArgs = {
            ...repositoryArgs,
            orderBy: "RATING_AVERAGE",
            orderDirection: "DESC",
        };
    }
    if (selectedLanguage == "LOWEST_RATED") {
        repositoryArgs = {
            ...repositoryArgs,
            orderBy: "RATING_AVERAGE",
            orderDirection: "ASC",
        };
    }

    const { repositories, loading } = useRepositories(repositoryArgs);
    if (loading) return null;

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <View>
                    <TextInput
                        placeholder="Filter repositories"
                        style={{
                            backgroundColor: "white",
                            padding: 10,
                            marginTop: 20,
                        }}
                        onChangeText={(newKeyword) => {
                            setSearchKeyword(newKeyword);
                        }}
                        defaultValue={searchKeyword}
                    ></TextInput>
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
                        <Picker.Item
                            label="Latest repositories"
                            value="LATEST"
                        />
                        <Picker.Item
                            label="Highest rated repositories"
                            value="HIGHEST_RATED"
                        />
                        <Picker.Item
                            label="Lowest rated repositories"
                            value="LOWEST_RATED"
                        />
                    </Picker>
                </View>
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
