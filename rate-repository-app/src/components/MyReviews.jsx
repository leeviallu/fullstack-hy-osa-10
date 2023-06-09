import { View, FlatList, Pressable, Alert, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { GET_CURRENT_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
    buttonBlue: {
        width: "40%",
        borderRadius: 5,
        padding: 10,
        backgroundColor: theme.colors.primary,
        overflow: "hidden",
        margin: 10,
    },
    buttonRed: {
        width: "40%",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#ff4d4d",
        overflow: "hidden",
        margin: 10,
    },
});

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [mutate] = useMutation(DELETE_REVIEW);
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Delete",
                    onPress: () => {
                        mutate({
                            variables: {
                                deleteReviewId: review.node.id,
                            },
                        });
                        refetch({ includeReviews: false });
                        refetch({ includeReviews: true });
                    },

                    style: "cancel",
                },
            ]
        );
    return (
        <View
            style={{
                backgroundColor: theme.backgrounds.item,
                marginTop: 10,
            }}
        >
            <View
                style={{
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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Pressable
                    style={styles.buttonBlue}
                    onPress={() => {
                        navigate(`/${review.node.repositoryId}`);
                    }}
                >
                    <Text
                        fontWeight={"bold"}
                        style={{ color: "white", alignSelf: "center" }}
                    >
                        View repository
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.buttonRed}
                    onPress={createTwoButtonAlert}
                >
                    <Text
                        fontWeight={"bold"}
                        style={{ color: "white", alignSelf: "center" }}
                    >
                        Delete review
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const MyReviews = () => {
    const { data, refetch } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: "cache-and-network",
        variables: {
            includeReviews: true,
        },
    });
    if (!data) return null;
    if (!data.me) return null;
    const { reviews } = data.me;
    if (reviews.edges.length == 0)
        return (
            <View
                style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: "white",
                    width: "95%",
                }}
            >
                <Text style={{ alignSelf: "center" }}>No reviews found</Text>
            </View>
        );

    return (
        <FlatList
            data={reviews.edges}
            renderItem={({ item }) => (
                <ReviewItem review={item} refetch={refetch} />
            )}
            keyExtractor={(item) => item.node.id}
        />
    );
};
export default MyReviews;
