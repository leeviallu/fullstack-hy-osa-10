import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";
import { AUTHENTICATED_USER } from "../graphql/queries";
import { useContext } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: -Constants.statusBarHeight,
        paddingTop: Constants.statusBarHeight * 1.5,
        paddingBottom: Constants.statusBarHeight * 0.5,
        backgroundColor: theme.backgrounds.bar,
        width: "100%",
    },
    buttonText: {
        color: "white",
        marginLeft: 20,
    },
});

const AppBar = () => {
    const { data } = useQuery(AUTHENTICATED_USER);
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };
    return (
        <View style={styles.container}>
            {data.me ? (
                <ScrollView horizontal>
                    <Link to="/">
                        <Text style={styles.buttonText}>Repositories</Text>
                    </Link>
                    <Pressable onPress={signOut}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </Pressable>
                </ScrollView>
            ) : (
                <ScrollView horizontal>
                    <Link to="/">
                        <Text style={styles.buttonText}>Repositories</Text>
                    </Link>
                    <Link to="/signin">
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Link>
                </ScrollView>
            )}
        </View>
    );
};

export default AppBar;
