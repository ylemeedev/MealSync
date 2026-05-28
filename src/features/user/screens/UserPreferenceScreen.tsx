import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useMe } from "../hooks/useUser";
import TextApp from "../../../shared/components/TextApp";
import { Colors, GlobalStyles } from "../../../assets";
import { Preference, PreferenceCategory, UserState } from "../types/user.types";
import "dayjs/locale/fr";
import { fr } from "../../../shared/lang/fr";
import { usePreference, useUpdatePreferences } from "../hooks/usePreference";
import Checkbox from "../../../shared/components/Checkbox";
import { Typography } from "../../../assets/fonts";
import { Loading } from "../../../shared/components/Loading";
import { LoadingError } from "../../../shared/components/LoadingError";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import ButtonCustom from "../../../shared/components/ButtonCustom";

export const UserPreferenceScreen = () => {
    const navigation = useAppNavigation();

    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe();
    const { data: preferences, isLoading: isLoadingPreference, error: errorPreference } = usePreference(); // Recupère toutes les préférences

    const updatePreferences = useUpdatePreferences();
    const isSaving = updatePreferences.isPending;

    const [newUserPreferences, setNewUserPreferences] = useState<number[]>([]);
    const [previousUserPreferences, setPreviousUserPreferences] = useState<number[]>([]);

    /**
     * Regroupe les préférences par catégorie fin de les lister
     */
    const groupedPreferences = useMemo(() => {
        if (!preferences) return {};

        return preferences.reduce((acc, preference) => {
            if (!acc[preference.category]) acc[preference.category] = [];
            acc[preference.category]!.push(preference);
            return acc;
        }, {} as Partial<Record<PreferenceCategory, Preference[]>>);
    }, [preferences]);

    /**
     * Au clic sur checkbox preference
     */
    const handleCheckboxPreference = (prefId: number) => {
        const updatedPreferences = newUserPreferences.includes(prefId) ? newUserPreferences.filter((id) => id !== prefId) : [...newUserPreferences, prefId];
        setNewUserPreferences(updatedPreferences);
    };

    /**
     * Complétion state formulaire
     */
    useEffect(() => {
        if (user) {
            setPreviousUserPreferences(user.userPreferences.map((userPreference) => userPreference.preference.id));
            setNewUserPreferences(user.userPreferences.map((userPreference) => userPreference.preference.id));
        }
    }, [user]);

    /**
     * Sauvegarde des preferences
     */
    const handleValidate = async () => {
        try {
            await updatePreferences.mutateAsync(newUserPreferences);
        } catch (error) {
            console.log("🚀 ~ handleValidate ~ error:", error);
        }
    };

    /**
     * Le state preferences a t-il etait modifié
     */
    const isModified = useMemo(() => {
        if (!user) return false;

        if (previousUserPreferences.length !== newUserPreferences.length) return true;

        return newUserPreferences.some((id) => !previousUserPreferences.includes(id));
    }, [newUserPreferences, user]);

    if (isLoadingUser) return <Loading />;

    if (errorUser || !user) return <LoadingError />;

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <ScrollView style={[GlobalStyles.ph, styles.container]} contentContainerStyle={styles.contentScrollContainer}>
                <TextApp style={styles.intro}>{fr.user.introPreferences}</TextApp>

                {(Object.entries(groupedPreferences) as [PreferenceCategory, Preference[]][]).map(([category, prefs]) => (
                    <View key={category}>
                        <TextApp style={styles.title}>{fr.user.preferences[category]}</TextApp>

                        {prefs.map((pref) => (
                            <Checkbox
                                key={pref.id}
                                label={pref.label}
                                onPress={() => handleCheckboxPreference(pref.id)}
                                isChecked={newUserPreferences.includes(pref.id)}
                                style={styles.checkbox}
                            />
                        ))}
                    </View>
                ))}

                <View style={styles.btnsContainer}>
                    <ButtonCustom
                        title={fr.btnSave}
                        onPress={handleValidate}
                        type="color"
                        disabled={isSaving || !isModified}
                        styleButton={styles.btn}
                        loader={isSaving}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    intro: {
        fontFamily: Typography.semiBold,
        marginVertical: 10,
    },
    contentScrollContainer: {
        paddingVertical: 10,
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
    title: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: Colors.mainColor,
        marginVertical: 10,
    },
    checkbox: {
        marginVertical: 3,
    },
});
