import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { logout } from "../../auth/services/auth.service";
import { useMe } from "../hooks/useUser";
import TextApp from "../../../shared/components/TextApp";
import { Colors, GlobalStyles } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { FormUser } from "../components/FormUser";

export const UserScreen = () => {
    const { data: user, isLoading, error } = useMe();

    const handleDisconnect = () => {
        logout();
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={100} color={Colors.mainColor} />
            </View>
        );
    }

    if (error || !user) {
        return (
            <View style={styles.errorContainer}>
                <TextApp style={styles.errorText}>Erreur de chargement</TextApp>
            </View>
        );
    }

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView>
                    <FormUser />
                    <View style={GlobalStyles.ph}>
                        <TouchableOpacity
                            onPress={handleDisconnect}
                            style={styles.btnLogout}
                        >
                            <Icon
                                name="logout"
                                size={20}
                                color={Colors.danger}
                            />
                            <TextApp style={styles.btnLogoutText}>
                                Se deconnecter
                            </TextApp>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnLogout: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnLogoutText: {
        marginLeft: 4,
        color: Colors.danger,
    },
});
