import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoDetailScreen from "../presentation/screens/detail/TodoDetailScreen";
import TabLayout from "../presentation/screens/main/_layout";
import NotFoundScreen from "../presentation/screens/+not-found";
import { RootStackParamList } from "@/app/navigation/types";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabLayout}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="TodoDetail" component={TodoDetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
