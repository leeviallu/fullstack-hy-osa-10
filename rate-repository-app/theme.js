import { Platform } from "react-native";
const theme = {
    colors: {
        textPrimary: "#24292e",
        textSecondary: "#586069",
        primary: "#0366d6",
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: "Roboto",
            ios: "Arial",
            default: "System",
        }),
    },
    fontWeights: {
        normal: "400",
        bold: "700",
    },
    backgrounds: {
        main: "#e1e4e8",
        bar: "#24292e",
        item: "white",
    },
};

export default theme;
