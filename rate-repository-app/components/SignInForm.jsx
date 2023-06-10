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
    inputElement: {
        width: "80%",
        alignSelf: "center",
    },
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={{ width: "100%", backgroundColor: "white" }}>
            <FormikTextInput
                style={styles.inputElement}
                autoCapitalize="none"
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
            <Pressable style={styles.button} onPress={onSubmit}>
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
    );
};

export default SignInForm;
