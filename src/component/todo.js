import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import TodoList from "./TodoList";

const Form = styled.form`
  display: flex;
  position: static;
  flex-direction: row;
  gap: 10px;
  max-width: 200px;
  width: 60%;
`;

const Todo = () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const fetchData = async () => {
    try {
      const q = query(
      collection(db, "todo"),
      orderBy("createAt","asc"),
      where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });

      setTodoList(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onWriteTodo = async (e) => {
    e.preventDefault();
    if (todo === "" || todo.length > 20) return;
    try {
      await addDoc(collection(db, "todo"), {
        todo,
        createAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId,
      });
      setTodo("");
      fetchData();

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Form onSubmit={onWriteTodo}>
        <input
          type="text"
          required
          value={todo}
          onChange={handleTodoChange}
          placeholder="Write Todo!"
        />
        <button type="submit" >📝</button>
      </Form>
      <TodoList userId={userId} todoList={todoList} />
    </div>
  );
};

export default Todo;
