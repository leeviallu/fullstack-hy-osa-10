import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { RepositoryInfo } from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Text from "./Text";

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
        first: 8,
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

    const { repositories, fetchMore } = useRepositories(repositoryArgs);

    const onEndReach = () => {
        fetchMore();
    };

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    if (repositoryNodes.length === 0) {
        return (
            <View style={{ width: "100%", paddingHorizontal: 8 }}>
                <TextInput
                    placeholder="Filter repositories"
                    autoCapitalize="none"
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
                <Text>No repositories found</Text>
            </View>
        );
    }
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
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryList;
