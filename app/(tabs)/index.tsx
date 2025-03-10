import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTodoStore } from "@/presentation/state/useTodoStore";
import { useEffect } from "react";

export default function HomeScreen() {
  const { todoList, loadTodoList } = useTodoStore();

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.backgroundContainer}>
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <ThemedView style={styles.stepContainer}>
              <ThemedText>{item.title}</ThemedText>
            </ThemedView>
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
    color: "white",
  },

  textContainer: {},
});
