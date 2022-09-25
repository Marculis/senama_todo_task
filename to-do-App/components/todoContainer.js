import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getTodoListAPI } from "../API/api";
import { AddTodoComponent } from "./addTodo";
import { Loader } from "./loader";
import { TodoItem } from "./todoItem";

// const todoList = [
//   {
//     _id: 1,
//     title: "FOURTH TASK ",
//     description: "Listen music",
//     complete: false,
//   },
//   {
//     _id: 12,
//     title: "THIRD TASK",
//     description: "watch the movie",
//     complete: true,
//   },
//   {
//     _id: 123,
//     title: "SECOND TASK ",
//     description: "Go camping",
//     complete: false,
//   },
//   {
//     _id: 1234,
//     title: "FIRST TASK ",
//     description: "buy something",
//     complete: false,
//   },

export const TodoContainer = () => {
  const [todoList, setTodoList] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    const res = await getTodoListAPI();
    setTodoList(res);
    return;
  };

  return (
    <View style={styles.container}>
      {load ? (
        <Loader size={200} />
      ) : (
        <View>
          <AddTodoComponent
            updateList={getTodoList}
            load={load}
            setLoad={setLoad}
          />
          {todoList?.reverse().map((item) => (
            <TodoItem
              key={item._id}
              title={item.title}
              text={item.description}
              complete={item.complete}
              id={item._id}
              updateList={getTodoList}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d9e8d5",
    width: "100%",
    padding: 20,
    gap: "20px",
  },
});
