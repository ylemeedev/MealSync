import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../assets";
import { HeaderShoppingList } from "../../features/shoppingList/components/HeaderShoppingList";
import { ShoppingListScreen } from "../../features/shoppingList/screens";
import { MealPlannerScreen } from "../../features/mealPlanner/screens";
import { BudgetScreen } from "../../features/budget/screens/BudgetScreen";
import { UserScreen } from "../../features/user/screens";
import { RootTabParamList } from "./types/rootNavigator.types";
import { HeaderUser } from "../../features/user/components/HeaderUser";
import { HeaderMealPlanner } from "../../features/mealPlanner/components/HeaderMealPlanner";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.white,
                tabBarInactiveTintColor: Colors.text,
                tabBarActiveBackgroundColor: Colors.mainColor,
                tabBarStyle: {
                    height: 60,
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                },
                tabBarIconStyle: {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                },
                headerStyle: {
                    backgroundColor: Colors.mainColor,
                },
                headerTitleStyle: {
                    color: Colors.white,
                },
            }}
        >
            <Tab.Screen
                name="ShoppingList"
                component={ShoppingListScreen}
                options={{
                    header: () => <HeaderShoppingList />,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="checklist" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="MealPlanner"
                component={MealPlannerScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-month" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Budget"
                component={BudgetScreen}
                options={{
                    title: "Mon budget",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="euro" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    header: () => <HeaderUser />,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
