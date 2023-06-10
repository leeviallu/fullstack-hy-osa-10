import { Formik } from "formik";
import SignInForm from "./SignInForm";

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };
    const initialValues = {
        username: "",
        password: "",
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
