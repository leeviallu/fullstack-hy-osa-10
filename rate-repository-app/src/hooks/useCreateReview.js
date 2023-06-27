import { useMutation } from "@apollo/client";
import { REVIEW_REPOSITORY } from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate, result] = useMutation(REVIEW_REPOSITORY);
    const createReview = async (review) => {
        const payload = await mutate({
            variables: { review },
        });
        const { data } = payload;

        return data;
    };
    return [createReview, result];
};

export default useCreateReview;
