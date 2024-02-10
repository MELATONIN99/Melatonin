import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  position: static;
  flex-direction: row;
  gap: 10px;
  max-width: 200px;
  width: 60%;
`;



export default function Todo() {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const [todo, setTodo] = useState("");

    const handleTodoChange = e => {
        setTodo(e.target.value);
    };

    const writeTodo = async(e) => {
        e.preventDefault();
        if( todo === "" || todo.length >20) return;
        try {
            await addDoc(collection(db, "todo"), {
                todo,
                createAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId,
            });
            setTodo("");
        } catch(e){
            console.log(e);
        }
  };

    return(
        <Form onSubmit = {writeTodo}>
            <input type="text"
            required
            value={todo}
            onChange={handleTodoChange}
            placeholder="Write Todo!"
            />
            <button type="submit">📝</button>
        </Form>
    );
    };