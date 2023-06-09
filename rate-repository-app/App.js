import { StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import theme from "./theme";

export default function App() {
    return (
        <View style={styles.container}>
            <AppBar />
            <RepositoryList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: theme.backgrounds.main,
        alignItems: "center",
        justifyContent: "center",
    },
});
