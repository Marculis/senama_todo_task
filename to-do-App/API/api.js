export const getTodoListAPI = async () => {
  const response = await fetch("http://localhost:8000/todos");
  if (response.ok) {
    const result = await response.json();
    return result;
  } else alert("error");
};

export const getTodoAPI = async (id) => {
  const response = await fetch(`http://localhost:8000/todos/${id}`);
  if (response.ok) {
    const result = await response.json();
    return result;
  } else alert("error");
};

export const toggleTodoAPI = async ({ id, complete }) => {
  const response = await fetch(`http://localhost:8000/todos/complete/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify({ complete: complete }),
  });
  if (response.ok) {
    await response.json();
    return;
  } else alert("Error");
};

export const editTodoAPI = async ({ id, body, title }) => {
  const response = await fetch(`http://localhost:8000/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify({ body, title }),
  });
  if (response.ok) {
    await response.json();
    return;
  } else alert("Error");
};

export const removeTodoAPI = async ({ id }) => {
  const response = await fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    return;
  } else alert("Error");
};

export const addTodoAPI = async ({ title, body }) => {
  const response = await fetch("http://localhost:8000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify({ body, title }),
  });
  if (response.ok) {
    await response.json();
    return;
  } else alert("Error");
};
