import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootTabParamList = {
    ShoppingList: undefined;
    MealPlanner: undefined;
    Budget: undefined;
    User: undefined;
};

export type RootStackParamList = {
    Auth: undefined;
    Main: NavigatorScreenParams<RootTabParamList>;
    CheckedShoppingList: { shoppingListId: number; shoppingListName: string };
    PlanningDetails: { planningId: number; planningName: string };
    AddPlanning: { weekNumber: number; year: number };
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigation>();
