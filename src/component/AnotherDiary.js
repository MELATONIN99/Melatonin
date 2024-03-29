import styled from "styled-components";
import { auth, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";


const Wrapper = styled.div`
  position: static;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  padding-left: 50px;
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
  font-weight: 600;
  font-size: 15px;
`;

const PayloadTitle = styled.h3`
  margin: 10px 0px;
  font-size: 18px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export default function AnotherDiary(props) {
  const { username, title, diary, userId, photo, id } = props;

  const user = auth.currentUser;
  const locationRef = ref(storage, `avatars/${user?.uid}`);
  const avatar = getDownloadURL(locationRef);

  return (
      <Wrapper>
          <Column>
              <Username>{username}</Username>
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