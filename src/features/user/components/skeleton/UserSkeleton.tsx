import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonBox from "../../../../shared/components/SkeletonBox";
import { Colors } from "../../../../assets";

export default function UserSkeleton() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <SkeletonBox width="70%" height={16} />
            </View>

            <View style={styles.card}>
                <SkeletonBox width="70%" height={16} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    card: {
        marginVertical: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: Colors.backgroundSkeleton,
    },
});