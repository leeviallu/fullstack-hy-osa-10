import * as yup from "yup";
import { Formik } from "formik";
import SignInForm from "./SignInForm";

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
    const onSubmit = (values) => {
        console.log(values);
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
