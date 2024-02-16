import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 200px;
  height: 100px;
  background: gray;
  padding: 20px;
  border-radius: 8px;
`;

const TodoList = (props) => {
  const todoList = props.todoList;
  const fetchData = props.fetchData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [todoState, setTodo] = useState("");

  
  const handleConfirm = async(itemId) => {
    try {
      await deleteDoc(doc(db,"todo", selectedItemId))
    }
    catch(e){
      console.log(e);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteBtn = (itemId) => {
    setSelectedItemId(itemId);
    console.log(itemId);
    setIsModalOpen(true);
  };



  const editBtn = (itemId) => {
    setSelectedItemId(itemId);
    const selectedItem = todoList.find((item) => item.id === itemId);
    setTodo(selectedItem.todo);
    setEditModalOpen(true);
  };


  const editHandleCancel = () => {
    setEditModalOpen(false);
  };


  const onEditChange = (e) => {
    setTodo(e.target.value);  
  };


  const handleEdit = async(e) => {
    try{
    const toDoDocRef = doc(db, "todo", selectedItemId);
    const data = {
      todo:todoState,
    }
    await updateDoc(toDoDocRef, data);
    setTodo("");
    await fetchData();
    setEditModalOpen(false);
  } catch (error) {
    console.error("error:handleEdit", error)
  }};


  return (
    <div>
      {todoList.map((item, index) => (
        <div key={item.id}>
          {item.todo}
          <button key={index.id} onClick={() => editBtn(item.id)}>수정</button>
          <button key={item.id} onClick={() => deleteBtn(item.id)}>
            삭제
          </button>
        </div>
      ))}

      {editModalOpen && (
      <ModalBackground>
        <ModalContainer>
          <div>
            {todoList.map((item) => (
              selectedItemId === item.id && (
                <div key={item.id}>
                  <input 
                  required
                  value={todoState}
                  maxLength={20}
                  onChange={onEditChange}
                  
                  >
                </input>
                </div>
                
              )
            ))}
            <button onClick={handleEdit}>확인</button>
            <button onClick={editHandleCancel}>취소</button>
          </div>
        </ModalContainer>
      </ModalBackground>
    )}



      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <p>정말로 삭제하시겠습니까?</p>
            <button onClick={handleConfirm}>확인</button>
            <button onClick={handleCancel}>취소</button>
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
};

export default TodoList;