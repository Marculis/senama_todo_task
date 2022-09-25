import { StyleSheet, View, TextInput, Button } from "react-native";
import { getTodoAPI, editTodoAPI } from "../API/api";

export const EditTodoComponent = ({
  id,
  todo,
  setLoad,
  setTodo,
  setEditMode,
}) => {
  const titleOnchange = (e) => {
    setTodo({ title: e.target.value, text: todo.text });
  };

  const textOnchange = (e) => {
    setTodo({ text: e.target.value, title: todo.title });
  };

  const editTodo = async () => {
    setLoad(true);
    await editTodoAPI({ id, body: todo.text, title: todo.title });
    await getTodoAPI(id);
    setLoad(false);
    setEditMode(false);
  };

  return (
    <View style={styles.editContainer}>
      <View style={styles.edit}>
        <TextInput
          style={styles.input}
          value={todo.title}
          placeholder="Title"
          onChange={(e) => titleOnchange(e)}
        />
        <TextInput
          style={styles.input}
          value={todo.text}
          placeholder="Text"
          onChange={(e) => textOnchange(e)}
        />
        <View style={styles.buttonBox}>
          <Button title="save changes" onPress={editTodo} />

          <Button
            title="cancel"
            color="#ffbb62"
            onPress={() => setEditMode(false)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: "#b6d9c5",
    borderRadius: 10,
    zIndex: 1000,
    width: "100%",
  },

  edit: {
    display: "flex",
    justifyContent: "center",
    zIndex: 1200,
    gap: 10,
    padding: 10,
    width: "100%",
  },

  buttonBox: {
    flexDirection: "row",
    gap: "20px",
  },
  input: {
    backgroundColor: "white",
    padding: 3,
    borderRadius: 4,
  },
});
