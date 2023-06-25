import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignInForm from "./SignInForm";
import theme from "../theme";
import SingleRepository from "./RepositoryItem";
import ReviewForm from "./ReviewForm";

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
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/signin" element={<SignInForm />} exact />
                <Route path="/review-form" element={<ReviewForm />} exact />
                <Route path="/:repositoryId" element={<SingleRepository />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
