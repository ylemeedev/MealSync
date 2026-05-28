import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../../features/auth/screens";
import { RootStackParamList } from "./types/rootNavigator.types";
import { TabNavigator } from "./TabNavigator";
import { Colors } from "../../assets";
import { PlanningDetailsScreen } from "../../features/planning/screens/PlanningDetailsScreen";
import { AddPlanningScreen } from "../../features/planning/screens/AddPlanningScreen";
import { UserPreferenceScreen, UserProfilScreen } from "../../features/user/screens";
import { fr } from "../../shared/lang/fr";
import { UserSettingsHeader } from "../../features/user/components/UserSettingsHeader";

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
            <Stack.Screen name="PlanningDetails" component={PlanningDetailsScreen} />
            <Stack.Screen name="AddPlanning" component={AddPlanningScreen} />
            <Stack.Screen
                name="UserProfil"
                component={UserProfilScreen}
                options={{
                    header: () => <UserSettingsHeader title={fr.user.title.profil} />,
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="UserPreference"
                component={UserPreferenceScreen}
                options={{
                    header: () => <UserSettingsHeader title={fr.user.title.preferences} />,
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
