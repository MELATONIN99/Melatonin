import { deleteDoc, doc } from "firebase/firestore";
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
  const [selectedItemId, setSelectedItemId] = useState(null);
  
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

  return (
    <div>
      {todoList.map((item) => (
        <div key={item.id}>
          {item.todo}
          <button>편집</button>
          <button key={item.id} onClick={() => deleteBtn(item.id)}>
            삭제
          </button>
        </div>
      ))}

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