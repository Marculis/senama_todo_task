import { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { addTodoAPI } from "../API/api";

export const AddTodoComponent = ({ updateList, setLoad }) => {
  const [todoData, setTodoData] = useState({
    title: "Title",
    body: "Text",
  });

  const titleOnchange = (e) => {
    setTodoData({ title: e.target.value, body: todoData.body });
  };

  const textOnchange = (e) => {
    setTodoData({ body: e.target.value, title: todoData.title });
  };

  const resetData = () => {
    setTodoData({ body: "Text", title: "Title" });
  };

  const addTodo = async () => {
    setLoad(true);
    await addTodoAPI(todoData);
    await updateList();
    setLoad(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={todoData.title}
        placeholder="Title"
        onChange={(e) => titleOnchange(e)}
      />
      <TextInput
        style={styles.input}
        value={todoData.body}
        placeholder="Text"
        onChange={(e) => textOnchange(e)}
      />
      <View style={styles.buttonBlock}>
        <Button title="Add task" onPress={addTodo} />
        <Button title="reset" color="#ffbb62" onPress={resetData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    backgroundColor: "#1dc0e42b",
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingLeft: 4,
    height: 30,
    marginBottom: 10,
  },
  buttonBlock: {
    flexDirection: "row",
  },
});
