import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";

export const TodoListWrapper = styled.div`
display: flex;
flex-direction: column;
position: static;
width: auto;
max-height: 250px;
align-items: center;
text-align: center;
overflow-y: auto;
border-bottom: 3px solid white;
max-height: 250px;
font-size: 16px;
background-color: rgba(69, 69, 69, 0.6);

&::-webkit-scrollbar {
    width: 5px;
  };

&::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 1);
    border-radius: 5px;
  };
`

const Todos = styled.div`
padding-left: 10px;
`
const TodosWrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
text-align: center;
align-content: center;

`

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

export const ForTodoBtn = styled.button`
  border: 0px;
  font-size:16px;
  background: rgba(69, 69, 69, 0.5);
  color: #dedede;
  width: 30px;
  height: 30px;
  
`
export const TodoBtnWrapper = styled.div`
display: flex;
flex-direction: row;
width: auto;
height: auto;
`
const BtnImg = styled.div`
width: 20px;
height: 20px;
`

const TodoList = (props) => {
  const todoList = props.todoList;
  const fetchData = props.fetchData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [todoState, setTodo] = useState("");
  const [completedItems, setCompletedItems] = useState([]);
  
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

  const onChecked = (itemId) => {
    setCompletedItems((prevCompleted) => {
      if (prevCompleted.includes(itemId)) {
        return prevCompleted.filter((id) => id !== itemId);
      } else {
        return [...prevCompleted, itemId];
      }
    });
  };
  return (
    <TodoListWrapper >
      {todoList.map((item) => (
        <TodosWrapper key={item.id}>
        <Todos>
        <input 
        type="checkbox" 
        onChange={() => onChecked(item.id)}
        checked={completedItems.includes(item.id)}
        />
          <span className={completedItems.includes(item.id) ? "completed" : ""}>{item.todo}</span>
          </Todos>
          <TodoBtnWrapper>
          <ForTodoBtn onClick={() => editBtn(item.id)}>
            <BtnImg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</BtnImg>

          </ForTodoBtn>
          <ForTodoBtn onClick={() => deleteBtn(item.id)}>
            <BtnImg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</BtnImg>
          </ForTodoBtn>
          </TodoBtnWrapper>
          </TodosWrapper>
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
    </TodoListWrapper>
  );
};

export default TodoList;