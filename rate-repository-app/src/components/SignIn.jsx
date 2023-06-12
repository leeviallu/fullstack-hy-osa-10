import * as yup from "yup";
import { Formik } from "formik";
import SignInForm from "./SignInForm";
import useSignIn from "../hooks/useSignIn";

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

const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
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
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
