import { StyleSheet, View } from "react-native";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { useMe } from "../hooks/useUser";
import { GlobalStyles } from "../../../assets";
import "dayjs/locale/fr";
import { fr } from "../../../shared/lang/fr";
import { usePreference } from "../hooks/usePreference";
import { Loading } from "../../../shared/components/Loading";
import { LoadingError } from "../../../shared/components/LoadingError";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";

export const UserForm = () => {
    const navigation = useAppNavigation();

    usePreference(); // Préchargement des préférences
    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe();

    const onPressProfil = () => {
        navigation.navigate("UserProfil");
    };

    const onPressPreference = () => {
        navigation.navigate("UserPreference");
    };

    if (isLoadingUser) return <Loading />;

    if (errorUser || !user) return <LoadingError />;

    return (
        <View style={[GlobalStyles.ph, styles.container]}>
            <ButtonCustom title={fr.user.title.profil} onPress={onPressProfil} />
            <ButtonCustom title={fr.user.title.preferences} onPress={onPressPreference} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
