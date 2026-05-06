import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, GlobalStyles } from "../../../assets";
import { CompletedIngredients, PriceByShop, ShoppingCardProps, ShopStats } from "../types/shoppingList.types";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import { useMemo } from "react";
import dayjs from 'dayjs';
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";

export const ShoppingCard = ({ shoppingList }: ShoppingCardProps) => {

    const navigation = useAppNavigation();

    const createdAt = dayjs(shoppingList.createdAt);

    /**
     * Somme total
     */
    const getMinPrice = (obj: PriceByShop) => {

        let minShop: string = "";
        let minPrice: number = Infinity;

        for (const k in obj) {
            if (obj[k] < minPrice) {
                minPrice = obj[k];
                minShop = k;
            }
        }

        return { minShop, minPrice }
    }

    /**
     * Nombre d'élément cheked = true
     */
    const sumChecked = (obj: CompletedIngredients) => {
        return Object.values(obj).filter(Boolean).length
    }

    /**
     * Chiffres du panier
     */
    const shopStats = useMemo<ShopStats>(() => {

        const result: ShopStats = {
            total: {},
            remaining: {},
            ingredients: {}
        };

        shoppingList.shoppingListItems.forEach(shoppingListItem => {

            shoppingListItem.ingredient.ingredientShops.forEach(ingredientShop => {
                const shopName = ingredientShop.shop.name;

                // Prix total par magasin
                if (!(shopName in result.total)) result.total[shopName] = 0;
                result.total[shopName] += Number(ingredientShop.price);

                // Prix restant par magasin (sans ingrédients déjà OK)
                if (!(shopName in result.remaining)) result.remaining[shopName] = 0;
                if (!shoppingListItem.isChecked) {
                    result.remaining[shopName] += Number(ingredientShop.price);
                }

                // Liste des ingredients ajoutés ou non
                result.ingredients[shoppingListItem.ingredient.name] = shoppingListItem.isChecked;
            })
        })

        return result

    }, [shoppingList])


    const minShopStats = useMemo<{ minShop: string, minPrice: number }>(() => {
        return getMinPrice(shopStats.total);
    }, [shopStats])

    const handlePress = () => {
        navigation.navigate('CheckedShoppingList', { shoppingListId: shoppingList.id });
    }

    return (
        <View style={GlobalStyles.ph}>
            <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={1}>
                <CardHeader title={shoppingList.name} date={createdAt.format('DD MMMM YYYY')} />
                <CardContent
                    productsCurrent={sumChecked(shopStats.ingredients)}
                    productsTotal={shoppingList.shoppingListItems.length}
                    budgetEstimated={minShopStats.minPrice}
                    shop={minShopStats.minShop}
                    progress={sumChecked(shopStats.ingredients) * 100 / shoppingList.shoppingListItems.length}
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
