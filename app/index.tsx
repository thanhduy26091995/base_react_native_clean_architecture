import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoDetailScreen from "../presentation/screens/detail/TodoDetailScreen";
import TabLayout from "../presentation/screens/main/(tabs)/TabNavigator";
import NotFoundScreen from "../presentation/screens/+not-found";
import { RootStackParamList } from "@/app/navigation/types";
import { getHeaderTitle, Header } from "@react-navigation/elements";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          header: ({ options, route, back }) => (
            <Header
              back={back}
              {...options}
              title={getHeaderTitle(options, route.name)}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabLayout}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen
          name="TodoDetail"
          component={TodoDetailScreen}
          options={{
            title: "Todo Detail",
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
