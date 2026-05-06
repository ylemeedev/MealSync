import { StyleSheet, View } from "react-native";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { CheckedShoppingListScreenProps } from "../types/shoppingList.types";


export const CheckedShoppingListScreen = ({ route }: CheckedShoppingListScreenProps) => {

    /* const shoppingListId = route.params.shoppingListId; */

    return (
        <>
            <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
                <View style={styles.container}>
                    <TextApp>CheckedShoppingList</TextApp>
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
