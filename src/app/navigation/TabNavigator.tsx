import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../assets";
import { RecipeScreen } from "../../features/recipe/screens";
import { PlanningListScreen } from "../../features/mealPlanner/screens";
import { UserScreen } from "../../features/user/screens";
import { RootTabParamList } from "./types/rootNavigator.types";
import { UserHeader } from "../../features/user/components/UserHeader";
import { FavoriteScreen } from "../../features/favorite/screens";

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
                name="PlanningList"
                component={PlanningListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="calendar-month" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{
                    title: "Recettes",
                    tabBarIcon: ({ color, size }) => <Icon name="view-carousel" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                    title: "Mes favoris",
                    tabBarIcon: ({ color, size }) => <Icon name="favorite" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    header: () => <UserHeader />,
                    tabBarIcon: ({ color, size }) => <Icon name="account-circle" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};
