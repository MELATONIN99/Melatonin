import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import TodoList, { ForTodoBtn } from "./TodoList";

const BtnImg = styled.div`
width: 20px;
height: 20px;
`

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
        
        <ForTodoBtn type="submit" >
        <BtnImg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
</BtnImg>
        </ForTodoBtn>
      </Form>
      </TodoWrapper>
      <TodoList fetchData = {fetchData} userId={userId} todoList={todoList}></TodoList>
      </div>
  );
};

export default Todo;
