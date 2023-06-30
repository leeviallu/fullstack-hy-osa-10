import { View, FlatList } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

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

const MyReviews = () => {
    const { data } = useQuery(GET_CURRENT_USER, {
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
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.node.id}
        />
    );
};
export default MyReviews;
