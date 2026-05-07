import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useMemo, useRef } from "react";
import ScreenContainer from "../../../shared/components/ScreenContainer";
import { Colors, GlobalStyles } from "../../../assets";
import { ShoppingList } from "../components/ShoppingList";
import { Filters } from "../components/Filters";
import { BottomSheetContainer } from "../../../shared/components/BottomSheetContainer";
import { FiltersForm } from "../components/FiltersForm";
import { BottomSheetRef } from "../../../shared/types/types";
import { SortForm } from "../components/SortForm";
import { SearchForm } from "../components/SearchForm";
import { usePlannings } from "../hooks/usePlannings";
import { useMe } from "../../user/hooks/useUser";
import { Typography } from "../../../assets/fonts";
import TextApp from "../../../shared/components/TextApp";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import { PlanningList, ShoppingList as ShoppingListType } from "../types/shoppingList.types";

export const ShoppingListScreen = () => {

    const { data: user, isLoading: isLoadingUser, error: errorUser } = useMe()
    const { data: planningLists, isLoading: isLoadingListsLoading, error: errorListsLoading } = usePlannings({ enabled: !!user?.id })

    const bottomSheetRef = useRef<BottomSheetRef>(null);

    const shoppingLists = useMemo<ShoppingListType[]>(() => {
        if (!planningLists) return [];

        return planningLists.flatMap(
            (planning: PlanningList) => planning.shoppingLists ?? []
        )
    }, [planningLists])

    const handlePressFilters = () => bottomSheetRef.current?.snapToIndex(0);

    if (isLoadingUser || isLoadingListsLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={100} color={Colors.mainColor} />
            </View>
        );
    }

    if (!user || errorUser || errorListsLoading) {
        return (
            <View style={styles.errorContainer}>
                <TextApp style={styles.errorText}>Erreur de chargement</TextApp>
            </View>
        );
    }

    if (!shoppingLists) {
        return (
            <View style={{ ...GlobalStyles.ph, ...styles.infoContainer }}>
                <ButtonCustom title="Commencer" onPress={() => { }} type="linear" styleButton={styles.btnStartList} />
            </View>
        );
    }

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
                    <ShoppingList shoppingLists={shoppingLists} />
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStartList: {
        width: 200
    },
    errorText: {
        color: Colors.danger,
        fontSize: 16,
        fontFamily: Typography.semiBold
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
