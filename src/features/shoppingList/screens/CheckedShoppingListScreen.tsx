import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import TextApp from "../../../shared/components/TextApp";
import { CheckedShoppingListScreenProps } from "../types/shoppingList.types";
import { useShoppingListItem, useUpdateShoppingList } from "../hooks/useShoppingLists";
import { Typography } from "../../../assets/fonts";
import Checkbox from "../../../shared/components/Checkbox";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";

export const CheckedShoppingListScreen = ({ route }: CheckedShoppingListScreenProps) => {
    
    const navigation = useAppNavigation();
    const { shoppingListId } = route.params;

    const { data: shoppingListItem, isLoading, error } = useShoppingListItem(shoppingListId);

    const updateShoppingLists = useUpdateShoppingList(shoppingListId);

    const handleToggleCheckbox = (id: number, isChecked: boolean) => {
        updateShoppingLists.mutate({
            shoppingListItemId: id,
            isChecked: !isChecked,
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={100} color={Colors.mainColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <TextApp style={styles.errorText}>Erreur de chargement</TextApp>
            </View>
        );
    }

    if (!shoppingListItem) {
        return (
            <View style={styles.emptyContainer}>
                <TextApp style={styles.emptyText}>Votre liste est vide</TextApp>
            </View>
        );
    }

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <View style={{ ...GlobalStyles.ph, ...styles.container }}>
                <FlatList
                    data={shoppingListItem}
                    renderItem={({ item }) => (
                        <Checkbox
                            label={`${item.quantity} ${item.unit} ${item.ingredient.name}`}
                            isChecked={item.isChecked}
                            onPress={() => handleToggleCheckbox(item.id, item.isChecked)}
                            style={styles.checkbox}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.btns}>
                    <ButtonCustom title="Mes listes de course" onPress={handleGoBack} type="color" />
                </View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
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
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: Colors.text,
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    checkbox: {
        marginBottom: 10,
    },
    btns: {},
});
