import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    const createUser = async (user) => {
        const payload = await mutate({
            variables: { user },
        });
        const { data } = payload;

        return data;
    };
    return [createUser, result];
};

export default useSignUp;
