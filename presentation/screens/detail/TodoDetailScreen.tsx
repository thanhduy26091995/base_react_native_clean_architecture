import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const TodoDetailScreen = () => {

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Detail Screen</Text>
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
