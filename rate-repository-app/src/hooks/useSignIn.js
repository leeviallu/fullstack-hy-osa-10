import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";

import { useContext } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";

import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE_USER);

    const signIn = async ({ username, password }) => {
        const credentials = { username, password };
        const payload = await mutate({
            variables: { credentials },
        });
        const { data } = payload;
        if (data?.authenticate) {
            await authStorage.setAccessToken(data.authenticate.accessToken);
            apolloClient.resetStore();
        }
        return payload;
    };
    return [signIn, result];
};

export default useSignIn;
