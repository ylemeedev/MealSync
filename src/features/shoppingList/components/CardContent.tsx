import { StyleSheet, View } from "react-native";
import TextApp from "../../../shared/components/TextApp";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import { CardContentProps } from "../types/shoppingList.types";

export const CardContent = ({ checkedItems, totalItems, bestShop, bestPrice, progress }: CardContentProps) => {
    return (
        <View>
            <View style={styles.item}>
                <Icon name="check-circle" size={20} color={Colors.mainColor} style={styles.iconItem} />
                <TextApp style={styles.productsAdded}>
                    <TextApp style={{ fontFamily: Typography.bold }}>
                        {checkedItems}/{totalItems}
                    </TextApp>{" "}
                    produits ajoutés
                </TextApp>
            </View>

            <View style={styles.item}>
                <Icon name="euro" size={20} color={Colors.warning} style={styles.iconItem} />
                <TextApp style={styles.estimatedBudget}>
                    Budget estimé : <TextApp style={{ fontFamily: Typography.bold }}>{bestPrice.toFixed(2)} €</TextApp>
                </TextApp>
            </View>

            <View style={styles.item}>
                <Icon name="shopping-cart" size={20} color={Colors.secondary} style={styles.iconItem} />
                <TextApp style={styles.shop}>
                    Magasin : <TextApp style={{ fontFamily: Typography.bold }}>{bestShop}</TextApp>
                </TextApp>
            </View>

            <View style={styles.progressBar}>
                <View style={{ ...styles.fillProgressBar, width: `${progress}%` }}>
                    <TextApp style={styles.textProgressBar}>{progress}%</TextApp>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 5,
    },
    iconItem: {
        width: 30,
    },
    productsAdded: {
        fontFamily: Typography.regular,
    },
    estimatedBudget: {
        fontFamily: Typography.regular,
    },
    shop: {
        fontFamily: Typography.regular,
    },
    progressBar: {
        height: 20,
        width: "100%",
        backgroundColor: Colors.background,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 10,
    },
    fillProgressBar: {
        height: "100%",
        backgroundColor: Colors.mainColor,
        alignItems: "center",
        justifyContent: "center",
    },
    textProgressBar: {
        color: Colors.white,
        fontFamily: Typography.medium,
        fontSize: 12,
    },
});
