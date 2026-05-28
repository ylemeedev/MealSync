import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { SkeletonBoxProps } from "../types/types";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SkeletonBox({ width: w = "100%", height = 20, borderRadius = 8 }: SkeletonBoxProps) {
    const translateX = useSharedValue(-SCREEN_WIDTH);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(SCREEN_WIDTH, {
                duration: 1200,
                easing: Easing.linear,
            }),
            -1,
            false,
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[styles.container, { width: w, height, borderRadius }]}>
            <Animated.View style={[styles.shimmer, animatedStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E1E9EE",
        overflow: "hidden",
    },
    shimmer: {
        width: "40%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.4)",
        position: "absolute",
    },
});
