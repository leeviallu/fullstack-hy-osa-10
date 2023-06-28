import * as yup from "yup";
import { Formik } from "formik";
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
    username: yup
        .string()
        .min(5, "Username must contain atleast 5 characters")
        .max(30, "Username must contain max 30 characters")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Password must contain atleast 5 characters")
        .max(30, "Password must contain max 30 characters")
        .required("Password is required"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

const SignUpContainer = ({ onSubmit }) => {
    const initialValues = {
        username: "",
        password: "",
        passwordConfirmation: "",
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
                    <FormikTextInput
                        secureTextEntry={true}
                        name="passwordConfirmation"
                        placeholder="Password confirmation"
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
                            Sign up
                        </Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
};

const SignUpForm = () => {
    // const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        // const { username, password } = values;
        try {
            // const { data } = await signIn({ username, password });
            // console.log(data);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
        console.log(values);
    };
    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUpForm;
