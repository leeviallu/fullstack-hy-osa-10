import { TextInput as NativeTextInput, StyleSheet } from "react-native";

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 5,
        borderColor: "grey",
        margin: 10,
    },
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [style];

    return (
        <NativeTextInput style={textInputStyle && styles.input} {...props} />
    );
};

export default TextInput;
