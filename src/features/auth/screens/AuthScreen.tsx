// AuthScreen.tsx
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { FormContainer } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, GlobalStyles } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import TextApp from "../../../shared/components/TextApp";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { NamesForm } from "../types/auth.types";
import { BottomSheetContainer } from "../../../shared/components/BottomSheetContainer";
import { BottomSheetRef } from "../../../shared/types/types";
import { loadToken, logout } from "../services/auth.service";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { fetchMe } from "../../user/api/user.api";

export const AuthScreen = () => {
    const navigation = useAppNavigation();

    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [formShow, setFormShow] = useState<NamesForm>(null);
    const [ready, setReady] = useState<boolean>(false);

    const handlePress = (formName: NamesForm) => {
        setFormShow(formName);
    };

    useEffect(() => {
        if (!formShow) return;

        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bottomSheetRef.current?.snapToIndex(0);
            });
        });

        return () => cancelAnimationFrame(id);
    }, [formShow]);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await loadToken();

                if (!token) {
                    await logout(false);
                    return;
                }

                //await fetchMe()

                navigation.replace("Main", { screen: "ShoppingList" });
            } catch (error) {
                console.log("🚀 - AUTHSCREEN ~ initAuth:", error);
                await logout(false);
            } finally {
                setReady(true);
            }
        };

        initAuth();
    }, []);

    /*     const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) setFormShow(null);
    }, []); */

    return (
        <>
            <ScreenContainer safeAreaBottom={false}>
                {/* Logo */}
                <View style={styles.logo}>
                    <Icon name="dining" size={100} color={Colors.white} />
                    <TextApp style={styles.logoText}>Meal Planner</TextApp>
                    <TextApp style={styles.bgText}>Bienvenue</TextApp>
                </View>

                {!ready ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={80} color={Colors.white} />
                    </View>
                ) : (
                    <View style={{ ...GlobalStyles.ph, ...styles.btnsContainer }}>
                        <ButtonCustom title="Se connecter" type="color" onPress={() => handlePress("login")} />
                        <ButtonCustom title="Créer un compte" type="light" onPress={() => handlePress("register")} styleButton={styles.btnRegister} />
                        <ButtonCustom title="Mot de passe oublié" onPress={() => handlePress("forgotPassword")} styleButton={styles.btnForgotPassword} />
                    </View>
                )}
            </ScreenContainer>

            {/* Form */}
            <BottomSheetContainer ref={bottomSheetRef} bgColor={Colors.white}>
                <FormContainer formShow={formShow} onClickBottomSheet={(val) => handlePress(val)} />
            </BottomSheetContainer>
        </>
    );
};

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoText: {
        color: "#fff",
        fontSize: 20,
        textTransform: "uppercase",
        fontFamily: Typography.bold,
    },
    bgText: {
        color: "#fff",
        fontSize: 18,
        marginTop: 20,
        fontFamily: Typography.regular,
    },
    btnsContainer: {
        flex: 1,
        justifyContent: "center",
    },
    btnRegister: {
        alignItems: "center",
        marginVertical: 10,
    },
    btnForgotPassword: {
        alignItems: "center",
        marginTop: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
