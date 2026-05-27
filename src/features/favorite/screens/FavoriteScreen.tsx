import { StyleSheet, View } from "react-native";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";

export const FavoriteScreen = () => {
    return (
        <>
            <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
                <View style={styles.container}>
                    <TextApp>FavoriteScreen</TextApp>
                </View>
            </ScreenContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
