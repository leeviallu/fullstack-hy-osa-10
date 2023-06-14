import { RepositoryListContainer } from "../../components/RepositoryList";
import { render, screen } from "@testing-library/react-native";

const kiloFormatter = (num) => {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
};

describe("RepositoryList", () => {
    describe("RepositoryListContainer", () => {
        it("renders repository information correctly", () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                    startCursor:
                        "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                },
                edges: [
                    {
                        node: {
                            id: "jaredpalmer.formik",
                            fullName: "jaredpalmer/formik",
                            description:
                                "Build forms in React, without the tears",
                            language: "TypeScript",
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                "https://avatars2.githubusercontent.com/u/4060187?v=4",
                        },
                        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                    },
                    {
                        node: {
                            id: "async-library.react-async",
                            fullName: "async-library/react-async",
                            description:
                                "Flexible promise-based React data loader",
                            language: "JavaScript",
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                "https://avatars1.githubusercontent.com/u/54310907?v=4",
                        },
                        cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                    },
                ],
            };

            render(<RepositoryListContainer repositories={repositories} />);
            const repositoryItems = screen.getAllByTestId("repositoryItem");
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

            //tests for first repository
            expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");
            expect(firstRepositoryItem).toHaveTextContent(
                "Build forms in React, without the tears"
            );
            expect(firstRepositoryItem).toHaveTextContent("TypeScript");
            expect(firstRepositoryItem).toHaveTextContent(kiloFormatter(1619));
            expect(firstRepositoryItem).toHaveTextContent(kiloFormatter(21856));
            expect(firstRepositoryItem).toHaveTextContent(kiloFormatter(88));
            expect(firstRepositoryItem).toHaveTextContent(kiloFormatter(3));

            //tests for second repository
            expect(secondRepositoryItem).toHaveTextContent(
                "async-library/react-async"
            );
            expect(secondRepositoryItem).toHaveTextContent(
                "Flexible promise-based React data loader"
            );
            expect(secondRepositoryItem).toHaveTextContent("JavaScript");
            expect(secondRepositoryItem).toHaveTextContent(kiloFormatter(69));
            expect(secondRepositoryItem).toHaveTextContent(kiloFormatter(1760));
            expect(secondRepositoryItem).toHaveTextContent(kiloFormatter(72));
            expect(secondRepositoryItem).toHaveTextContent(kiloFormatter(3));
        });
    });
});
