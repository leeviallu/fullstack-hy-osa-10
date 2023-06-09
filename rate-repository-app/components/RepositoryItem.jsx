import { Text, View, StyleSheet, Image } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.backgrounds.item,
    },
    repositoryInfo: {
        margin: 15,
        flexDirection: "row",
    },
    repositoryStats: {
        flexDirection: "row",
        marginHorizontal: 30,
        marginBottom: 15,
    },
    infoContainer: {
        width: "100%",
        marginLeft: 10,
    },
    statContainer: {
        flex: 1,
    },
    logo: {
        borderRadius: 5,
        width: 66,
        height: 58,
    },
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.repositoryInfo}>
                <Image
                    style={styles.logo}
                    source={{ uri: item.ownerAvatarUrl }}
                />
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {item.fullName}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>{item.description}</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                borderRadius: 5,
                                padding: 10,
                                backgroundColor: theme.colors.primary,
                                color: "white",
                                overflow: "hidden",
                            }}
                        >
                            {item.language}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.repositoryStats}>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.stargazersCount}
                    </Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.forksCount}
                    </Text>
                    <Text>Forks</Text>
                </View>

                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.reviewCount}
                    </Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.ratingAverage}
                    </Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    );
};
export default RepositoryItem;
