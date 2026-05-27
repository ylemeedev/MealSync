import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Typography } from "./fonts";

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    h1: {
        fontSize: 24,
        fontFamily: Typography.bold,
    },
    h2: {
        fontSize: 22,
        fontFamily: Typography.medium,
    },
    ph: {
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 10,
        shadowColor: "#000000a1",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
    },
});
