import { StyleSheet, View } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";
import TextApp from "../../../shared/components/TextApp";
import { Colors } from "../../../assets";
import { Typography } from "../../../assets/fonts";
import { CardHeaderProps } from "../types/shoppingList.types";

export const CardHeader = ({ title, date }: CardHeaderProps) => {
    return (
        <View style={styles.cardHeader}>
            <View>
                <TextApp style={styles.title}>{title}</TextApp>
                <TextApp style={styles.date}>{date}</TextApp>
            </View>

            <Menu>
                <MenuTrigger>
                    <Icon name="more-vert" size={20} color={Colors.text} />
                </MenuTrigger>

                <MenuOptions>
                    <MenuOption onSelect={() => console.log(`Save`)}>
                        <TextApp style={styles.btnModify}>Modifier</TextApp>
                    </MenuOption>
                    <MenuOption onSelect={() => console.log(`Supprimer`)}>
                        <TextApp style={styles.btnDelete}>Supprimer</TextApp>
                    </MenuOption>
                    <MenuOption onSelect={() => console.log(`Partager`)}>
                        <TextApp style={styles.btnShare}>Partager</TextApp>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: Typography.bold,
        marginBottom: 5,
    },
    date: {
        fontFamily: Typography.regular,
    },
    btnModify: {
        color: Colors.text,
    },
    btnDelete: {
        color: Colors.danger,
    },
    btnShare: {
        color: Colors.mainColor,
    },
});
