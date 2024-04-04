import styled from "styled-components";
import { auth, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

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
  const [isAvatar, setIsAvatar] = useState(null);
  const { username, title, diary, userId, photo, id } = props;

  const user = auth.currentUser;
  useEffect(() => {
  if( user !== null ){
  const locationRef = ref(storage, `avatars/${userId}`);
  getDownloadURL(locationRef)
  .then(avatar => {
  setIsAvatar(avatar)
  })
  .catch(error => {
    console.error("Error");
  });
  }
},[user]);

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
              {user?.uid === userId ? <button>edit</button> : null}
              {user?.uid === userId ? <button>delete</button> : null}
          </Column>
          <Column>
              {photo ? <Photo src={photo} /> : null}
          </Column>
      </Wrapper>
  );
}