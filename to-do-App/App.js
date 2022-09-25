import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TodoContainer } from "./components/todoContainer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> ToDo Application</Text>
      <TodoContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    padding: 10,
    fontSize: 28,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
