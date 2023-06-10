import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 5,
        borderColor: "grey",
        margin: 10,
    },
    errorInput: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 5,
        borderColor: "#d73a4a",
        margin: 10,
    },
    errorText: {
        marginTop: 5,
        marginLeft: 15,
        color: "#d73a4a",
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <View>
            {showError ? (
                <View>
                    <TextInput
                        style={styles.errorInput}
                        onChangeText={(value) => helpers.setValue(value)}
                        onBlur={() => helpers.setTouched(true)}
                        value={field.value}
                        error={showError}
                        {...props}
                    />
                    <Text style={styles.errorText}>{meta.error}</Text>
                </View>
            ) : (
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => helpers.setValue(value)}
                    onBlur={() => helpers.setTouched(true)}
                    value={field.value}
                    error={showError}
                    {...props}
                />
            )}
        </View>
    );
};

export default FormikTextInput;
