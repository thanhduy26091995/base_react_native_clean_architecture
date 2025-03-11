import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTodoStore } from "@/presentation/state/useTodoStore";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/types";

export default function HomeScreen() {
  const { todoList, loadTodoList } = useTodoStore();
  const navigation = useNavigation<NavigationProps>();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Main">;

  useEffect(() => {
    loadTodoList();
  }, []);

  const handlePress = (id: number) => {
    console.log("id", id);
    navigation.navigate("TodoDetail", { id });
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <View style={styles.stepContainer}>
                <Text style={styles.textContainer}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    color: "white",
  },

  stepContainer: {
    gap: 8,
    padding: 8,
    color: "lightgray",
  },

  textContainer: {
    color: "black",
  },
});
