import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";

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
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.buttonText}>Repositories</Text>
                </Link>
                <Link to="/signin">
                    <Text style={styles.buttonText}>Sign In</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;
