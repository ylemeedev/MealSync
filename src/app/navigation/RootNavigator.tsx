import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../../features/auth/screens";
import { RootStackParamList } from "./types/rootNavigator.types";
import { TabNavigator } from "./TabNavigator";
import { CheckedShoppingListScreen } from "../../features/shoppingList/screens";
import { Colors } from "../../assets";
import { HeaderCheckedShoppingList } from "../../features/shoppingList/components/HeaderCheckedShoppingList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.mainColor,
                },
                headerTitleStyle: {
                    color: Colors.white,
                },
            }}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
                name="CheckedShoppingList"
                component={CheckedShoppingListScreen}
                options={({ route }) => ({
                    header: () => (
                        <HeaderCheckedShoppingList
                            title={route.params.shoppingListName}
                        />
                    ),
                    headerShown: true,
                })}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
