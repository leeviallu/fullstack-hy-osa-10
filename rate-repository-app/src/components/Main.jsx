import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: theme.backgrounds.main,
        alignItems: "center",
        justifyContent: "start",
    },
});

const Main = () => {
    const repositoryId = "jaredpalmer.formik";
    const { repository } = useRepository(repositoryId);
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/signin" element={<SignIn />} exact />
                <Route
                    path="/:repositoryId"
                    element={<RepositoryItem item={repository} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
