import { Image, StyleSheet, TouchableOpacity, useAnimatedValue, View } from "react-native";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import Icon from "react-native-vector-icons/MaterialIcons";
import Animated from "react-native-reanimated";
import { useCallback, useState } from "react";
import { Recipe } from "../types/recipe.types";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { useRecipes } from "../hooks/useRecipe";

/* const recipes: Recipe[] = [
    {
        id: 1,
        name: "Pancakes aux fruits rouges",
        description: "Pancakes moelleux accompagnés de fruits rouges frais et d’un filet de sirop d’érable.",
        recipePicture: "https://images.pexels.com/photos/6546433/pexels-photo-6546433.jpeg",
    },
    {
        id: 2,
        name: "Toast avocat & œufs",
        description: "Pain grillé, avocat écrasé et œufs pochés pour un petit-déjeuner équilibré.",
        recipePicture: "https://images.pexels.com/photos/8902069/pexels-photo-8902069.jpeg",
    },
    {
        id: 3,
        name: "Bol healthy protéiné",
        description: "Mélange de légumes frais, quinoa et protéines végétales pour un repas complet.",
        recipePicture: "https://images.pexels.com/photos/5491151/pexels-photo-5491151.jpeg",
    },
    {
        id: 4,
        name: "Salade méditerranéenne",
        description: "Salade fraîche aux tomates, concombre, feta et olives noires.",
        recipePicture: "https://images.pexels.com/photos/29666890/pexels-photo-29666890.jpeg",
    },
]; */

export const RecipeScreen = () => {
    const { data: recipes, isLoading: isLoadingRecipes, error: errorRecipes, isError: isErrorRecipes } = useRecipes(1);

    const fadeAnim = useAnimatedValue(0);
    const fadeIn = () => {};

    const [recipeIndex, setRecipeIndex] = useState<number>(0);

    const nextRecipe = () => {
        if (recipes) setRecipeIndex((prev) => (recipes.length - 1 <= prev ? 0 : prev + 1));
    };

    /**
     * Au clic sur : pas intéressé par cette recette
     */
    const handleNotInterested = () => {
        nextRecipe();
    };

    /**
     * Au clic sur : ajouter cette recette aux favoris
     */
    const handleAddFavorite = () => {
        nextRecipe();
    };

    return (
        <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
            <View style={[GlobalStyles.ph, styles.container]}>
                <Animated.View style={styles.animatedView}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: recipes[recipeIndex].recipePicture }} style={styles.img} resizeMode="cover" />
                        <TextApp style={styles.name}>{recipes[recipeIndex].name}</TextApp>
                    </View>

                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={handleNotInterested} activeOpacity={0} style={[styles.btn, styles.btnNotInterested]}>
                            <Icon name="close" size={50} color={Colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAddFavorite} activeOpacity={0} style={[styles.btn, styles.btnFavorite]}>
                            <Icon name="favorite" size={50} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    animatedView: {
        flex: 1,
        borderRadius: 20,
        overflow: "hidden",
    },
    imgContainer: {
        flex: 1,
    },
    img: {
        height: "100%",
    },
    name: {
        color: Colors.white,
        fontFamily: Typography.bold,
        position: "absolute",
        padding: 20,
        fontSize: 20,
        textAlign: "center",
        width: "100%",
    },
    btnsContainer: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        bottom: 0,
        width: "100%",
        paddingBottom: 20,
    },
    btn: {
        width: 90,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    btnNotInterested: {
        backgroundColor: Colors.danger,
    },
    btnFavorite: {
        backgroundColor: Colors.success,
    },
});
