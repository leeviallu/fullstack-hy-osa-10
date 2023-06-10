import { View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
    },
    inputElement: {
        width: "80%",
        alignSelf: "center",
    },
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={{ width: "100%" }}>
            <FormikTextInput
                style={styles.inputElement}
                testID="usernameInput"
                name="username"
                placeholder="Username"
            />
            <FormikTextInput
                style={styles.inputElement}
                testID="passwordInput"
                secureTextEntry={true}
                name="password"
                placeholder="Password"
            />
            <Pressable
                style={styles.button && styles.inputElement}
                onPress={onSubmit}
            >
                <Text>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;
