import styled from "styled-components";
import { auth, db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DiarySubmitBtn } from "./MyDiary";

const ModalBackground = styled.div`
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

const ModalContainer = styled.div`
  width: 50vw;
  height: auto;
  background: #454545;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
const EditDiaryForm = styled.form`
width: 100%;
`;
const EditDiaryTitle = styled.input`
position: static;
width: 100%;
height: 30px;
border: 0px;
border-radius: 20px 20px 0px 0px;
padding: 10px 15px;
padding-left: 15px;
font-weight: 600;
box-sizing: border-box;
margin-bottom: 2px;
background-color: #dedede;
color: #2B2B2B;
`;
const EditDiaryText = styled.textarea`
width: 100%;
height: 150px;
border: 0px;
border-radius: 0px 0px 20px 20px;
padding: 10px 15px;
box-sizing: border-box;
background-color: #dedede;
color: #2B2B2B;
word-wrap: break-word;
`;

const UserDisplay = styled.div`
display: flex;
align-items: center;
padding-bottom: 5px;
border-bottom: 1px solid #454545;

`;
const AvatarWrapper = styled.div`
width: 35px;
height: 35px;
border-radius: 70%;
overflow: hidden;
background-color: #BE9FE1;
`;
const AvatarImg = styled.img`
width: 100%;
`;

const Wrapper = styled.div`
  position: static;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  word-wrap: break-word;
  background-color: #343434;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
  word-wrap: break-word;
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
  word-wrap: break-word;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 12px;
  word-wrap: break-word;
  max-width: 500px;
`;

const BtnWrapper = styled.div`
display: flex;
`;

export const MiniBtn = styled.button`
  margin-right: 5px;
  color: #BE9FE1;
  background-color: #2B2B2B;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #BE9FE1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: auto;
  display: block;
  font-family: 'Roboto', sans-serif;
  &:hover,
  &:focus {
    background-color: #C9B6E4;
    color: #454545;
  }
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
  e.preventDefault();
  if(!user || isDiary === "" || isDiary.length >180 || isTitle === "" || isTitle.length>30 ) return;
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
              <BtnWrapper>
              {user?.uid === userId ? <MiniBtn onClick={() => editBtn(id)}>edit</MiniBtn> : null}
              {user?.uid === userId ? <MiniBtn onClick={() => deleteBtn(id)}>delete</MiniBtn> : null}
              </BtnWrapper>
          </Column>
          <Column>
              {photo ? <Photo src={photo} /> : null}
          </Column>


          {editModalOpen && (
      <ModalBackground>
        <ModalContainer>
            {(diarys || myDiarys).map((item) => (
              selectedItemId === item.id && (
                <EditDiaryForm key={item.id}>
                  <EditDiaryTitle
                  required
                  rows={1}
                  value={isTitle}
                  maxLength={30}
                  onChange={onEditTitleChange}
                  >
                  </EditDiaryTitle>
                  <EditDiaryText
                  required
                  rows={5}
                  value={isDiary}
                  maxLength={180}
                  onChange={onEditDiaryChange}
                  >
                </EditDiaryText>
                </EditDiaryForm>
                
              )
            ))}
            <BtnWrapper>
            <DiarySubmitBtn onClick={handleEdit}>확인</DiarySubmitBtn>
            <DiarySubmitBtn onClick={editHandleCancel}>취소</DiarySubmitBtn>
            </BtnWrapper>
        </ModalContainer>
      </ModalBackground>
    )}

{delModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <p>정말로 삭제하시겠습니까?</p>
            <DiarySubmitBtn onClick={delConfirm}>확인</DiarySubmitBtn>
            <DiarySubmitBtn onClick={delCancel}>취소</DiarySubmitBtn>
          </ModalContainer>
        </ModalBackground>
      )}
      </Wrapper>
);
}