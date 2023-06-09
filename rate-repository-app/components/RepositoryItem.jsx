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
        display: "flex",
        width: "75%",
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
    const {
        ownerAvatarUrl,
        fullName,
        description,
        language,
        stargazersCount,
        forksCount,
        reviewCount,
        ratingAverage,
    } = item;

    const kiloFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
            : Math.sign(num) * Math.abs(num);
    };

    return (
        <View style={styles.container}>
            <View style={styles.repositoryInfo}>
                <Image style={styles.logo} source={{ uri: ownerAvatarUrl }} />
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {fullName}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 10,
                            flexGrow: 2,
                        }}
                    >
                        {description}
                    </Text>
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
                            {language}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.repositoryStats}>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                        {kiloFormatter(stargazersCount)}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>Stars</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                        {kiloFormatter(forksCount)}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>Forks</Text>
                </View>

                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                        {kiloFormatter(reviewCount)}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>Reviews</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                        {kiloFormatter(ratingAverage)}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>Rating</Text>
                </View>
            </View>
        </View>
    );
};
export default RepositoryItem;
