import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        marginTop: -Constants.statusBarHeight,
        paddingTop: Constants.statusBarHeight * 1.5,
        paddingBottom: Constants.statusBarHeight * 0.5,
        paddingLeft: 20,
        backgroundColor: theme.backgrounds.bar,
        width: "100%",
    },
    buttonText: {
        color: "white",
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Pressable>
                <Text style={styles.buttonText}>Repositories</Text>
            </Pressable>
        </View>
    );
};

export default AppBar;
