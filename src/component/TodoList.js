import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

const TodoList = (props) => {
  const userId = props.userId;
  const todoList = props.todoList
  
  return (
    <div>
      {todoList.map((item) => (
        <div key={item.id}>{item.todo}</div>
      ))}
    </div>
  );
};

export default TodoList;