import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useMe } from "../hooks/useUser";
import { Colors } from "../../../assets";
import { HeaderContainer } from "../../../shared/components/HeaderContainer";
import { Typography } from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { UserHeaderSkeleton } from "./skeleton/UserHeaderSkeleton";

export const UserHeader = () => {
    const { data: user, isLoading, error } = useMe();

    if (isLoading || error || !user) return <UserHeaderSkeleton />

    return (
        <HeaderContainer bgColor={Colors.mainColor}>
            <View style={styles.header}>
                <View style={styles.pictureContainer}>
                    {user.profilePicture ? (
                        <Image
                            source={{ uri: user.profilePicture }}
                            style={styles.picture}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={Images.avatar}
                            style={styles.picture}
                            resizeMode="contain"
                        />
                    )}
                </View>
                <Text style={styles.userName}>{user.userName}</Text>
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
        backgroundColor: Colors.white,
    },
    picture: {
        width: "100%",
        height: "100%",
    },
    userName: {
        color: Colors.white,
        fontFamily: Typography.semiBold,
        fontSize: 18,
        marginLeft: 15,
    },
});
