import { useTodoDetailStore } from "@/presentation/state/useTodoStore";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const TodoDetailScreen = () => {
  const { todoEntity, getTodoDetail } = useTodoDetailStore();
  const route = useRoute();
  const { id } = route.params as { id: number };

  useEffect(() => {
    getTodoDetail(id);
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>{todoEntity.title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoDetailScreen;
