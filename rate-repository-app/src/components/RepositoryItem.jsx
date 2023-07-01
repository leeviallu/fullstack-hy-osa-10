import {
    View,
    StyleSheet,
    Image,
    Pressable,
    Linking,
    FlatList,
} from "react-native";
import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";
import { useParams } from "react-router-native";
import { format } from "date-fns";

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

export const RepositoryInfo = ({ repository }) => {
    const {
        ownerAvatarUrl,
        fullName,
        description,
        language,
        stargazersCount,
        forksCount,
        reviewCount,
        ratingAverage,
        url,
    } = repository;

    const kiloFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
            : Math.sign(num) * Math.abs(num);
    };

    return (
        <View>
            {url ? (
                <View testID="repositoryItem" style={styles.container}>
                    <View style={styles.repositoryInfo}>
                        <Image
                            style={styles.logo}
                            source={{ uri: ownerAvatarUrl }}
                        />
                        <View style={styles.infoContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ marginBottom: 10 }}
                            >
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
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(stargazersCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Stars</Text>
                        </View>
                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(forksCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Forks</Text>
                        </View>

                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(reviewCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Reviews</Text>
                        </View>
                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(ratingAverage)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Rating</Text>
                        </View>
                    </View>
                    <View>
                        <Pressable
                            style={{
                                alignSelf: "center",
                                width: "90%",
                                borderRadius: 5,
                                padding: 15,
                                marginBottom: 10,
                                backgroundColor: theme.colors.primary,
                                overflow: "hidden",
                            }}
                            onPress={() => Linking.openURL(url)}
                        >
                            <Text
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    color: "white",
                                    alignSelf: "center",
                                }}
                            >
                                {" "}
                                Open in Github
                            </Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View testID="repositoryItem" style={styles.container}>
                    <View style={styles.repositoryInfo}>
                        <Image
                            style={styles.logo}
                            source={{ uri: ownerAvatarUrl }}
                        />
                        <View style={styles.infoContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ marginBottom: 10 }}
                            >
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
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(stargazersCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Stars</Text>
                        </View>
                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(forksCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Forks</Text>
                        </View>

                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(reviewCount)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Reviews</Text>
                        </View>
                        <View style={styles.statContainer}>
                            <Text
                                fontWeight="bold"
                                style={{ alignSelf: "center" }}
                            >
                                {kiloFormatter(ratingAverage)}
                            </Text>
                            <Text style={{ alignSelf: "center" }}>Rating</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View
            style={{
                backgroundColor: theme.backgrounds.item,
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
            }}
        >
            <View>
                <View
                    style={{
                        margin: 15,
                        width: 50,
                        height: 50,
                        borderWidth: 3,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: theme.colors.primary,
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.primary,
                        }}
                    >
                        {review.node.rating}
                    </Text>
                </View>
            </View>
            <View style={{ paddingVertical: 10, width: "75%" }}>
                <Text fontWeight="bold">{review.node.user.username}</Text>
                <Text style={{ paddingTop: 5, color: "gray" }}>
                    {format(new Date(review.node.createdAt), "dd.MM.yyyy")}
                </Text>
                <Text style={{ paddingTop: 5 }}>{review.node.text}</Text>
            </View>
        </View>
    );
};

const SingleRepository = () => {
    const { repositoryId } = useParams();
    const reviewsFetched = 4;
    const reviewFetch = useReviews(repositoryId, reviewsFetched);
    const repositoryFetch = useRepository(repositoryId);
    if (repositoryFetch.loading || reviewFetch.loading) return null;
    const { reviews, fetchMore } = reviewFetch;
    const { repository } = repositoryFetch;
    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ node }) => node.id}
            ListHeaderComponent={() => (
                <RepositoryInfo repository={repository} />
            )}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepository;
