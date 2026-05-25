import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, GlobalStyles } from "../../../assets";
import { ShoppingListCardProps } from "../types/shoppingList.types";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";

export const ShoppingListCard = ({ shoppingList }: ShoppingListCardProps) => {
    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("CheckedShoppingList", {
            shoppingListId: shoppingList.id,
            shoppingListName: shoppingList.name,
        });
    };

    return (
        <View style={GlobalStyles.ph}>
            <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={1}>
                <CardHeader title={shoppingList.name} />
                <CardContent
                    checkedItems={shoppingList.checkedItems}
                    totalItems={shoppingList.totalItems}
                    bestPrice={shoppingList.bestPrice}
                    bestShop={shoppingList.bestShop}
                    progress={shoppingList.progress}
                />
                {/* {item.sharedProfiles && (
                    <CardFooter sharedProfiles={item.sharedProfiles} />
                )} */}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: Colors.mainColor,
    },
});
