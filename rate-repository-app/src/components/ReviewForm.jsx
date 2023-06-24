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

export const ReviewContainer = ({ onSubmit }) => {
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(3, "Username must contain atleast 3 characters")
            .required("Username is required"),
        password: yup
            .string()
            .min(8, "Password must contain atleast 8 characters")
            .required("Password is required"),
    });

    const initialValues = {
        username: "",
        password: "",
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
                        name="username"
                        placeholder="Username"
                    />
                    <FormikTextInput
                        secureTextEntry={true}
                        name="password"
                        placeholder="Password"
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
                            Sign In
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
