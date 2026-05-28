import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { logout } from "../../auth/services/auth.service";
import { useMe } from "../hooks/useUser";
import TextApp from "../../../shared/components/TextApp";
import { Colors, GlobalStyles } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { fr } from "../../../shared/lang/fr";
import { LoadingError } from "../../../shared/components/LoadingError";
import { Loading } from "../../../shared/components/Loading";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import { usePreference } from "../hooks/usePreference";
import UserSkeleton from "../components/skeleton/UserSkeleton";

export const UserScreen = () => {
    const navigation = useAppNavigation();

    usePreference(); // Préchargement des préférences

    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe();

    /**
     * Deconnexion
     */
    const handleDisconnect = () => {
        logout();
    };

    /**
     * Vers page "Mes informations personnelles"
     */
    const onPressProfil = () => {
        navigation.navigate("UserProfil");
    };

    /**
     * Vers page "Mes préférences"
     */
    const onPressPreference = () => {
        navigation.navigate("UserPreference");
    };

    if (isLoadingUser) return <UserSkeleton />;

    if (errorUser || !user) return <LoadingError />;

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <View style={[GlobalStyles.ph, styles.container]}>
                <TouchableOpacity onPress={onPressProfil} style={[GlobalStyles.card, styles.btn]}>
                    <View style={styles.btnLeft}>
                        <Icon name="manage-accounts" size={34} color={Colors.mainColor} />
                        <TextApp style={styles.btnText}>{fr.user.title.profil}</TextApp>
                    </View>
                    <Icon name="chevron-right" size={28} color={Colors.text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressPreference} style={[GlobalStyles.card, styles.btn]}>
                    <View style={styles.btnLeft}>
                        <Icon name="view-list" size={34} color={Colors.mainColor} />
                        <TextApp style={styles.btnText}>{fr.user.title.preferences}</TextApp>
                    </View>
                    <Icon name="chevron-right" size={28} color={Colors.text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDisconnect} style={styles.btnLogout}>
                    <Icon name="logout" size={20} color={Colors.danger} />
                    <TextApp style={styles.btnLogoutText}>{fr.btnLogout}</TextApp>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        marginVertical: 10
    },
    btnLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    btnText: {
        fontSize: 16,
    },
    btnLogout: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
    },
    btnLogoutText: {
        marginLeft: 4,
        color: Colors.danger,
        fontSize: 16,
    },
    groupBtn: {
        /*         borderBottomWidth: 1,
        borderColor: Colors.text, */
    },
    groupLogout: {
        /* borderBottomWidth: 0, */
    },
});
