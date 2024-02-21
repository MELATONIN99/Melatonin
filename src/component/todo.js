import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import TodoList, { ForTodoBtn } from "./TodoList";


const TodoWrapper = styled.div`
align-items: center;

`
const TodoInput = styled.input`
font-size: 20px;
align-items: center;
width: 100%;
height:80%;
background-color:transparent;
border: 0px;
padding-left:10px;
color: white;

&:focus{
  outline: solid;
  outline-width: thin;
  outline-color: white;
}

&::placeholder{
  color: white;
}


`

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 34px;
    border: 0px;
    outline: none;
    text-align: center;
    border-bottom: 3px solid white;
    background: none;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
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
    <TodoWrapper>
      <Form onSubmit={onWriteTodo}>
        <TodoInput
          type="text"
          required
          value={todo}
          onChange={handleTodoChange}
          placeholder="Write Todo!"
        />
        
        <ForTodoBtn type="submit" >📝</ForTodoBtn>
      </Form>
      </TodoWrapper>
      <TodoList fetchData = {fetchData} userId={userId} todoList={todoList}></TodoList>
      </div>
  );
};

export default Todo;
