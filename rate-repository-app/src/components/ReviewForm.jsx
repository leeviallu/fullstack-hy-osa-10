import * as yup from "yup";
import { Formik } from "formik";
import useCreateReview from "../hooks/useCreateReview";
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
    ownerName: yup.string().required("Repository owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
        .number()
        .integer()
        .min(0, "Rating must be bigger than 0")
        .max(100, "Rating must be less than 100")
        .required("Rating is required"),
    text: yup.string(),
});

const ReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        ownerName: "",
        repositoryName: "",
        rating: NaN,
        text: "",
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
                        name="ownerName"
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
                        name="text"
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
    const [createReview] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const review = {
            ...values,
            rating: Number(values["rating"]),
        };
        try {
            const data = await createReview(review);
            navigate(`/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };
    return <ReviewContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
