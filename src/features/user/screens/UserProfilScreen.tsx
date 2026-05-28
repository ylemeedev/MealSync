import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { useMe, useUpdateMe } from "../hooks/useUser";
import TextApp from "../../../shared/components/TextApp";
import Input from "../../../shared/components/Input";
import { Colors, GlobalStyles } from "../../../assets";
import { UserState } from "../types/user.types";
import "dayjs/locale/fr";
import { fr } from "../../../shared/lang/fr";
import { Loading } from "../../../shared/components/Loading";
import { LoadingError } from "../../../shared/components/LoadingError";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Typography } from "../../../assets/fonts";

export const UserProfilScreen = () => {
    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe();

    const updateMe = useUpdateMe();
    const isSaving = updateMe.isPending;

    /**
     * Init state formulaire
     */
    const [form, setForm] = useState<UserState>({
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        dateOfBirth: new Date(),
        userPreferences: [],
    });

    /**
     * Complétion state formulaire
     */
    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                email: user.email,
                userName: user.userName,
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                profilePicture: user.profilePicture ?? "",
                dateOfBirth: user.dateOfBirth ?? new Date(),
            }));
        }
    }, [user]);

    /**
     * Sauvegarde User
     */
    const handleValidate = async () => {
        try {
            await updateMe.mutateAsync(form);
        } catch (error) {
            console.log("🚀 ~ handleValidate ~ error:", error);
        }
    };

    /**
     * Le state form a t-il etait modifié
     */
    const isModified = useMemo(() => {
        if (!user) return false;

        return (
            form.email !== user.email ||
            form.userName !== user.userName ||
            form.firstName !== (user.firstName ?? "") ||
            form.lastName !== (user.lastName ?? "") ||
            form.profilePicture !== (user.profilePicture ?? "")
        );
    }, [form, user]);

    if (isLoadingUser) return <Loading />;

    if (errorUser || !user) return <LoadingError />;

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <View style={[GlobalStyles.ph, styles.container]}>
                    <TextApp style={styles.intro}>{fr.user.introProfil}</TextApp>

                    <View style={styles.formGroup}>
                        <TextApp>{fr.user.label.emailAddress}</TextApp>
                        <Input
                            value={form.email}
                            autoCorrect={false}
                            placeholder={fr.user.placeholder.emailAddress}
                            onChangeText={(val) => setForm((prev) => ({ ...prev, email: val }))}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <TextApp>{fr.user.label.username}</TextApp>
                        <Input
                            value={form.userName}
                            placeholder={fr.user.placeholder.username}
                            onChangeText={(val) => setForm((prev) => ({ ...prev, userName: val }))}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <TextApp>{fr.user.label.firstName}</TextApp>
                        <Input
                            value={form.firstName}
                            placeholder={fr.user.placeholder.firstName}
                            onChangeText={(val) => setForm((prev) => ({ ...prev, firstName: val }))}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <TextApp>{fr.user.label.lastName}</TextApp>
                        <Input
                            value={form.lastName}
                            placeholder={fr.user.placeholder.lastName}
                            onChangeText={(val) => setForm((prev) => ({ ...prev, lastName: val }))}
                            style={styles.input}
                        />
                    </View>

                    {/* 
            
                        <View style={styles.formGroup}>
                <TextApp>{fr.user.label.profilePicture}</TextApp>
                <Input
                    value={form.profilePicture}
                    placeholder={fr.user.placeholder.profilePicture}
                    onChangeText={(val) =>
                        setForm({ ...form, profilePicture: val })
                    }
                    style={styles.input}
                />
            </View> */}
                    {/* 
            
                        <View style={styles.formGroup}>
                <TextApp>{fr.user.label.birthDate}</TextApp>
                <Input
                value={form.dateOfBirth?.toDateString()}
                placeholder={fr.user.placeholder.birthDate}
                onChangeText={(val) => setForm({ ...form, toDateString: val })}
                    style={styles.input}
                />
            </View> */}

                    <View style={styles.btnsContainer}>
                        <ButtonCustom
                            title={isSaving ? "Chargement" : "Valider"}
                            onPress={handleValidate}
                            type="color"
                            disabled={isSaving || !isModified}
                            styleButton={styles.btn}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    intro: {
        fontFamily: Typography.semiBold,
        marginVertical: 10,
    },
    input: {
        marginTop: 5,
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
    },
    btn: {
        flex: 1,
    },
    registrationDate: {
        paddingVertical: 10,
    },
    formGroup: {
        marginVertical: 10,
    },
});
