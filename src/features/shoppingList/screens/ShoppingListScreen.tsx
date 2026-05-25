import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import { Filters } from "../components/Filters";
import { BottomSheetContainer } from "../../../shared/components/BottomSheetContainer";
import { FiltersForm } from "../components/FiltersForm";
import { BottomSheetRef } from "../../../shared/types/types";
import { SortForm } from "../components/SortForm";
import { SearchForm } from "../components/SearchForm";
import { useMe } from "../../user/hooks/useUser";
import { Typography } from "../../../assets/fonts";
import TextApp from "../../../shared/components/TextApp";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { ShoppingListCard } from "../components/ShoppingListCard";
import { useShoppingsList } from "../hooks/useShoppingLists";

export const ShoppingListScreen = () => {

    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe();
   /*  const { data: shoppingsList, isLoading: isLoadingShoppingsLists, error: errorShoppingsLists } = useShoppingsList({ enabled: !!user?.id }); */

    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const handlePressFilters = () => bottomSheetRef.current?.snapToIndex(0);
/* 
    if (isLoadingUser || isLoadingShoppingsLists) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={100} color={Colors.mainColor} />
            </View>
        );
    }

    if (!user || errorUser || errorShoppingsLists) {
        return (
            <View style={styles.errorContainer}>
                <TextApp style={styles.errorText}>Erreur de chargement</TextApp>
            </View>
        );
    }

    if (!shoppingsList) {
        return (
            <View style={{ ...GlobalStyles.ph, ...styles.infoContainer }}>
                <ButtonCustom title="Commencer" onPress={() => {}} type="linear" styleButton={styles.btnStartList} />
            </View>
        );
    } */

    return (
        <>
            <ScreenContainer safeAreaTop={false} bgColor={Colors.background}>
                <View style={styles.container}>
                    {/*                     <View style={{ ...GlobalStyles.ph, ...styles.filtersSort }}>
                        <Filters handlePress={handlePressFilters} />
                        <SortForm
                            onValueChange={(filter) =>
                                console.log(">>>> ", filter)
                            }
                        />
                    </View>
                    <SearchForm onChange={(text) => console.log(text)} /> */}

{/*                     <FlatList
                        data={shoppingsList}
                        renderItem={({ item }) => <ShoppingListCard shoppingList={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatList}
                    /> */}
                </View>
            </ScreenContainer>

            <BottomSheetContainer ref={bottomSheetRef} bgColor={Colors.white}>
                <FiltersForm />
            </BottomSheetContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filtersSort: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnStartList: {
        width: 200,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: Typography.semiBold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatList: {
        paddingVertical: 15,
    },
});
