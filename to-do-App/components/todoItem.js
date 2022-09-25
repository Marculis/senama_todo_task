import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { toggleTodoAPI, getTodoAPI, removeTodoAPI } from "../API/api";
import { EditTodoComponent } from "./editTodo";
import { Loader } from "./loader";

export const TodoItem = ({ id, title, text, complete, updateList }) => {
  const [load, setLoad] = useState(false);
  const [todo, setTodo] = useState({ title, text, complete });
  const [editMode, setEditMode] = useState(false);

  const toggleTodo = async () => {
    setLoad(true);
    await toggleTodoAPI({ id, complete: !todo.complete });
    const newTodoData = await getTodoAPI(id);
    await setTodo({
      title: newTodoData.title,
      text: newTodoData.description,
      complete: newTodoData.complete,
    });
    setLoad(false);
  };

  const toggleEditMode = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const deleteTodo = async () => {
    setLoad(true);
    await removeTodoAPI({ id });
    await updateList();
    setLoad(false);
  };

  return (
    <View style={styles.container}>
      {load ? (
        <Loader size={80} />
      ) : (
        <>
          {editMode ? (
            <EditTodoComponent
              id={id}
              todo={todo}
              setLoad={setLoad}
              setTodo={setTodo}
              setEditMode={setEditMode}
            />
          ) : (
            <>
              <Button
                onPress={toggleTodo}
                color={todo.complete && "#ffbb62"}
                title={todo.complete ? "cancel" : "done"}
              />

              <View style={styles.text}>
                <Text style={styles.title}>{todo.title} </Text>
                <Text style={styles.body}>{todo.text} </Text>
              </View>
              <View style={styles.buttonBox}>
                <TouchableOpacity onPress={toggleEditMode}>
                  <Image
                    style={styles.imgButton}
                    source={require("../assets/edit.png")}
                    onPres
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteTodo}>
                  <Image
                    style={styles.imgButton}
                    source={require("../assets/delete.png")}
                  />
                </TouchableOpacity>
              </View>
              {todo.complete && <View style={styles.complete}></View>}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1fbf5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 3,
    marginBottom: 3,
    width: "100%",
    borderRadius: 10,
    gap: 10,
    minHeight: 100,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    padding: 3,

    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#b1b1b1",
    fontWeight: "bold",

    borderRadius: 5,
    backgroundColor: "rgb(217, 232, 213)",
  },

  body: {
    padding: 5,

    fontSize: 14,

    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonBox: { flexDirection: "row", gap: 10 },

  imgButton: {
    width: 20,
    height: 25,
  },

  complete: {
    width: "85%",
    height: "100%",
    position: "absolute",
    right: 0,
    backgroundColor: "#d5d5d5",
    opacity: 0.7,
    borderRadius: 10,
  },
});
