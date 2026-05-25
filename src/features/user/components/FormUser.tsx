import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { useMe, useUpdateMe } from "../hooks/useUser";
import TextApp from "../../../shared/components/TextApp";
import Input from "../../../shared/components/Input";
import { GlobalStyles } from "../../../assets";
import { UserState } from "../types/user.types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { fr } from "../../../shared/lang/fr";

export const FormUser = () => {
    const { data: user, isLoading, error } = useMe();
    const updateMe = useUpdateMe();

    const [form, setForm] = useState<UserState>({
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        dateOfBirth: new Date(),
    });

    useEffect(() => {
        if (user) {
            setForm({
                email: user.email,
                userName: user.userName,
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                profilePicture: user.profilePicture ?? "",
                dateOfBirth: user.dateOfBirth ?? new Date(),
            });
        }
    }, [user]);

    const handleValidate = async () => {
        try {
            await updateMe.mutateAsync(form);
        } catch (error) {
            console.log("🚀 - FORM USER - handleValidate :", error);
        }
    };

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

    if (isLoading || error || !user) return null;

    const createdAt = dayjs(user.createdAt);

    return (
        <View style={{ ...GlobalStyles.ph, ...styles.container }}>
            <TextApp style={styles.registrationDate}>
                Inscrit depuis le {createdAt.format("DD MMMM YYYY")}
            </TextApp>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.emailAddress}</TextApp>
                <Input
                    value={form.email}
                    autoCorrect={false}
                    placeholder={fr.user.placeholder.emailAddress}
                    onChangeText={(val) => setForm({ ...form, email: val })}
                    style={styles.input}
                />
            </View>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.username}</TextApp>
                <Input
                    value={form.userName}
                    placeholder={fr.user.placeholder.username}
                    onChangeText={(val) => setForm({ ...form, userName: val })}
                    style={styles.input}
                />
            </View>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.firstName}</TextApp>
                <Input
                    value={form.firstName}
                    placeholder={fr.user.placeholder.firstName}
                    onChangeText={(val) => setForm({ ...form, firstName: val })}
                    style={styles.input}
                />
            </View>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.lastName}</TextApp>
                <Input
                    value={form.lastName}
                    placeholder={fr.user.placeholder.lastName}
                    onChangeText={(val) => setForm({ ...form, lastName: val })}
                    style={styles.input}
                />
            </View>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.goal}</TextApp>
{/*                 <Input
                    value={form.objective}
                    placeholder={fr.user.placeholder.goal}
                    onChangeText={(val) => setForm({ ...form, objective: val })}
                    style={styles.input}
                /> */}
            </View>

            <View style={styles.formGroup}>
                <TextApp>{fr.user.label.preferences}</TextApp>
{/*                 <Input
                    value={form.preference}
                    placeholder={fr.user.placeholder.preference}
                    onChangeText={(val) => setForm({ ...form, preference: val })}
                    style={styles.input}
                /> */}
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
                {isModified && (
                    <ButtonCustom
                        title={updateMe.isPending ? "Chargement" : "Valider"}
                        onPress={handleValidate}
                        type="color"
                        disabled={updateMe.isPending}
                        styleButton={styles.btn}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
