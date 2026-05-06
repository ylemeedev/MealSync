import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenContainerProps } from "../types/types";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../assets";
import { View } from "react-native";


const ScreenContainer = ({ children, safeAreaTop = true, safeAreaBottom = true, bgColor = "linear" }: ScreenContainerProps) => {
    const insets = useSafeAreaInsets();

    const containerStyle = {
        flex: 1,
        paddingTop: safeAreaTop ? insets.top : 0,
        paddingBottom: safeAreaBottom ? insets.bottom : 0,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    };

    if (bgColor === "linear") {
        return (
            <LinearGradient colors={[Colors.linearStart, Colors.linearEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={containerStyle}>
                {children}
            </LinearGradient>
        );
    }

    return <View style={{ ...containerStyle, backgroundColor: bgColor }}>{children}</View>;
};

export default ScreenContainer;