import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderContainerProps } from "../types/types";
import { Colors, GlobalStyles } from "../../assets";

export const HeaderContainer = ({
    children,
    bgColor = Colors.mainColor,
}: HeaderContainerProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top, backgroundColor: bgColor }}>
            <View style={{ ...styles.container, ...GlobalStyles.ph }}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
});
