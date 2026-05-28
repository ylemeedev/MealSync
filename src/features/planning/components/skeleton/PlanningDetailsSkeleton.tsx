import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonBox from "../../../../shared/components/SkeletonBox";
import { Colors, GlobalStyles } from "../../../../assets";

export default function PlanningDetailsSkeleton() {
    return (
        <View style={[styles.container, GlobalStyles.ph]}>
            <View style={styles.content}>
                {Array.from({ length: 7 }).map((_, i) => (
                    <View key={i} style={styles.dayCard}>
                        <SkeletonBox width="40%" height={16} />
                        <View style={styles.spacing} />
                        <SkeletonBox width="80%" height={16} />
                        <View style={styles.spacing} />
                        <SkeletonBox width="70%" height={16} />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    header: {
        marginBottom: 20,
    },
    content: {
        flex: 1,
    },
    dayCard: {
        padding: 16,
        paddingVertical: 25,
        borderRadius: 12,
        backgroundColor: Colors.backgroundSkeleton,
        marginBottom: 12,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginTop: 10,
    },
    spacing: {
        height: 25,
    },
});
