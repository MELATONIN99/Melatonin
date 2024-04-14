import styled from "styled-components";
import { auth, db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { ModalBackground, ModalContainer } from "./TodoList";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const UserDisplay = styled.div`
display: flex;
align-items: center;
padding-bottom: 5px;
border-bottom: 1px solid #454545;

`
const AvatarWrapper = styled.div`
width: 35px;
height: 35px;
border-radius: 70%;
overflow: hidden;
background-color: #BE9FE1;
`
const AvatarImg = styled.img`
width: 100%;
`

const Wrapper = styled.div`
  position: static;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 15px;
`;

const Username = styled.span`
  margin-left: 10px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

const PayloadTitle = styled.h3`
  display: flex;
  text-align: left;
  align-items: center;
  margin: 10px 0px;
  font-size: 14px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 12px;
`;


export default function AnotherDiary(props) {
  const { username, title, diary, userId, photo, id, fetchDiary, diarys} = props;
  const { myDiarys, myTitle, myDiary } = props;
  const [isAvatar, setIsAvatar] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isTitle, setIsTitle] = useState(title||myTitle);
  const [isDiary, setIsDiary] = useState(diary||myDiary);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
// 유저 프로필사진
  const user = auth.currentUser;
  useEffect(() => {
  if( user.photoURL === null ) {
    setIsAvatar(null);
  } else {
  const locationRef = ref(storage, `avatars/${userId}`);
  if(locationRef !== null){
    console.log(locationRef)
  getDownloadURL(locationRef)
  .then(avatar => {
    setIsAvatar(avatar);
  })
  .catch(error => {
    if (error.code === 'storage/object-not-found') {
      // console.log(error, "error")
    } 
  })};
}
},[user, userId]);
// 글 내용 Edit
const editBtn = (itemId) => {
  setSelectedItemId(itemId);
  console.log(itemId);
let selectedItem = null;
  if (myDiarys && myDiarys.length > 0) {
    selectedItem = myDiarys.find((item) => item.id === selectedItemId);
    setEditModalOpen(true);
  } else if (diarys.length > 0) {
    selectedItem = diarys.find((item) => item.id === selectedItemId);
    setEditModalOpen(true);
  }

  if (selectedItem) {
    setIsTitle(selectedItem.title);
    setIsDiary(selectedItem.diary);
  }
};
const onEditTitleChange = (e) => {
  setIsTitle(e.target.value); 
};
const onEditDiaryChange = (e) => {
  setIsDiary(e.target.value);  
};
const handleEdit = async(e) => {
  try{
  const DiaryDocRef = doc(db, "diary", selectedItemId);
  const data = {
    title:isTitle,
    diary:isDiary,
  }
  await updateDoc(DiaryDocRef, data);
  setIsTitle("");
  setIsDiary("");
  setEditModalOpen(false);
  await fetchDiary();
} catch (error) {
  console.error("error:handleEdit", error)
}};
const editHandleCancel = () => {
  setEditModalOpen(false);
};

// 글 내용 delete
const deleteBtn = (itemId) => {
  setSelectedItemId(itemId);
  setDelModalOpen(true);
};

const delConfirm = async() => {
  try {
    await deleteDoc(doc(db,"diary", selectedItemId))
  }
  catch(e){
    console.log(e);
  }
  setDelModalOpen(false);
};

const delCancel = () => {
  setDelModalOpen(false);
}

  return (
      <Wrapper>
          <Column>
          <UserDisplay>
              <AvatarWrapper>
              <AvatarImg src={isAvatar}/>
              </AvatarWrapper>
              <Username>{username}</Username>
              </UserDisplay>
              <PayloadTitle>{title}</PayloadTitle>
              <Payload>{diary}</Payload>
              {user?.uid === userId ? <button onClick={() => editBtn(id)}>edit</button> : null}
              {user?.uid === userId ? <button onClick={() => deleteBtn(id)}>delete</button> : null}
          </Column>
          <Column>
              {photo ? <Photo src={photo} /> : null}
          </Column>


          {editModalOpen && (
      <ModalBackground>
        <ModalContainer>
          <div>
            {(diarys || myDiarys).map((item) => (
              selectedItemId === item.id && (
                <div key={item.id}>
                  <input
                  required
                  value={isTitle}
                  maxLength={10}
                  onChange={onEditTitleChange}
                  >
                  </input>
                  <input 
                  required
                  value={isDiary}
                  maxLength={20}
                  onChange={onEditDiaryChange}
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

{delModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <p>정말로 삭제하시겠습니까?</p>
            <button onClick={delConfirm}>확인</button>
            <button onClick={delCancel}>취소</button>
          </ModalContainer>
        </ModalBackground>
      )}
      </Wrapper>
  

);
  
}