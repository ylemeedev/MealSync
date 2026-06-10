import { Image, StyleSheet, TouchableOpacity, useAnimatedValue, View } from "react-native";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import Icon from "react-native-vector-icons/MaterialIcons";
import Animated from "react-native-reanimated";
import { useState } from "react";
import TextApp from "../../../shared/components/TextApp";
import { Typography } from "../../../assets/fonts";
import { useRecipes } from "../hooks/useRecipe";
import { LoadingError } from "../../../shared/components/LoadingError";

export const RecipeScreen = () => {
    const fadeAnim = useAnimatedValue(0);
    const fadeIn = () => {};

    const [recipeIndex, setRecipeIndex] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);

    const { data: recipes, isLoading: isLoadingRecipes, error: errorRecipes, isError: isErrorRecipes } = useRecipes(pageIndex);

    /**
     * Si pas de description ou d'image de la recette, on en ajoute vie l'API spoonacular
     */
/*     useEffect(() => {
        if (!recipes) return;

        for (const recipe of recipes) {
            if (!recipe.recipePicture) {
            
                break;
            }
        }
    }, [recipes]); */


    const nextRecipe = () => {
        if (recipes) {
            if (recipeIndex < recipes.length - 1) {
                setRecipeIndex((prev) => prev + 1);
            }

            if (recipeIndex >= recipes.length - 1) {
                setRecipeIndex(0);
                setPageIndex((prev) => prev + 1);
            }
        }
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

    if (errorRecipes || !recipes) return <LoadingError />;

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
        fontFamily: Typography.black,
        position: "absolute",
        padding: 20,
        fontSize: 26,
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
