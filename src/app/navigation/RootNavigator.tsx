import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../../features/auth/screens";
import { RootStackParamList } from "./types/rootNavigator.types";
import { TabNavigator } from "./TabNavigator";
import { CheckedShoppingListScreen } from "../../features/shoppingList/screens";
import { Colors } from "../../assets";

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
                    color: Colors.white
                },
            }}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="CheckedShoppingList" component={CheckedShoppingListScreen}
                options={{
                    headerShown: true,
                    title: "Mes repas",
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
