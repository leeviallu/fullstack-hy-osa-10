import * as yup from "yup";
import { Formik } from "formik";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

import { View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: theme.colors.primary,
        overflow: "hidden",
        margin: 10,
    },
});

const validationSchema = yup.object().shape({
    repositoryOwnerUsername: yup
        .string()
        .required("Repository name is required"),
    repositoryName: yup.string().required("Repository owner name is required"),
    rating: yup
        .number()
        .required("Rating is required")
        .test({
            name: "is-0-100",
            skipAbsent: true,
            test(value, ctx) {
                if (value > 100) {
                    return ctx.createError({
                        message: "Rating should be between 0 and 100",
                    });
                }
                if (value < 0) {
                    return ctx.createError({
                        message: "Rating should be between 0 and 100",
                    });
                }
                return true;
            },
        }),
    review: yup.string(),
});

const ReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        repositoryOwnerUsername: "",
        repositoryName: "",
        rating: "",
        review: "",
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <View style={{ width: "100%", backgroundColor: "white" }}>
                    <FormikTextInput
                        autoCapitalize="none"
                        name="repositoryOwnerUsername"
                        placeholder="Repository owner name"
                    />
                    <FormikTextInput
                        autoCapitalize="none"
                        name="repositoryName"
                        placeholder="Repository name"
                    />
                    <FormikTextInput
                        autoCapitalize="none"
                        name="rating"
                        placeholder="Rating between 0 and 100"
                    />
                    <FormikTextInput
                        multiline
                        autoCapitalize="none"
                        name="review"
                        placeholder="Review"
                    />
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text
                            fontWeight="bold"
                            style={{
                                color: "white",
                                textAlign: "center",
                                padding: 15,
                            }}
                        >
                            Create a review
                        </Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
};

const ReviewForm = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };
    return <ReviewContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
