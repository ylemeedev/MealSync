import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonBox from "../../../../shared/components/SkeletonBox";
import { HeaderContainer } from "../../../../shared/components/HeaderContainer";
import { Colors } from "../../../../assets";

export const UserHeaderSkeleton = () => {
    return (
        <HeaderContainer bgColor={Colors.mainColor}>
            <View style={styles.header}>
                {/* Avatar */}
                <View style={styles.pictureContainer}>
                    <SkeletonBox width={70} height={70} borderRadius={100} />
                </View>

                {/* Username */}
                <View style={styles.textContainer}>
                    <SkeletonBox width={120} height={18} />
                </View>
            </View>
        </HeaderContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    pictureContainer: {
        width: 70,
        height: 70,
        borderRadius: 100,
        overflow: "hidden",
    },

    textContainer: {
        marginLeft: 15,
    },
});
