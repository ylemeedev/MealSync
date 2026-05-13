/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import RootNavigator from "./src/app/navigation/RootNavigator";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/app/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const navigationRef = createNavigationContainerRef();

const queryClient = new QueryClient();

dayjs.locale("fr");

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <MenuProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                            <NavigationContainer ref={navigationRef}>
                                <RootNavigator />
                            </NavigationContainer>
                        </GestureHandlerRootView>
                    </MenuProvider>
                </SafeAreaProvider>
            </QueryClientProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
