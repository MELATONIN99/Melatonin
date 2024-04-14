import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import Navigation from "../component/Navigation";
import { useNavigate } from "react-router-dom";
import { ModalBackground, ModalContainer } from "../component/TodoList";
import { useState } from "react";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

const Btn = styled.button`
  background-color: #BE9FE1;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #dedede;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  height: auto;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 6px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    background-color: #C9B6E4;
  }
`;
const AvatarWrapper = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`
const AvatarUpload = styled.label`
z-index: 1;
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;
  background-color: #BE9FE1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`
const AvatarImg = styled.img`
width: 100%;
`

const AvatarInput = styled.input`
display: none;
`



const UserinfoBackground = styled.div`
position: relative;
z-index: 0;
top: -50px;
display: flex;
  align-items: center;
  justify-content: center;
  background-color: #343434;
  max-width: 400px;
  max-height: 500px;
  width: 300px;
  height: 100vh;
`

const UserinfoWrapper = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3c3c3c;
  max-width: 400px;
  max-height: 380px;
  width: 300px;
  margin: 5% auto;
  padding: 5%;
  height: 70%;
`

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;
const navigate = useNavigate();
const [isLogout, setIsLogout] = useState(false);
const [isNameChange,setIsNameChange] = useState(false);
const [avatar, setAvatar] = useState(user?.photoURL);

// 로그아웃 버튼 모달
const onLogout = () => {
  setIsLogout(true);
}
const onSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      alert("로그아웃 되었습니다.")
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

const logoutCancel = () => {
    setIsLogout(false);
  };


// 이름변경 버튼 모달
const onNameChange = () => {
  setIsNameChange(true);
}
const onAcceptChange = (event) => {
  event.preventDefault();
  const NewDisplayName = document.getElementById('NewDisplayName').value;
  updateProfile(auth.currentUser, {
    displayName:NewDisplayName,
  }).then(() => {
    setIsNameChange(false);
  }).catch((error) => {
    console.log(error,"error!");
  });
}
const nameChangeCancle = () => {
  setIsNameChange(false);
}
// 이메일 인증 전송 버튼
const onSendEmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    alert("send complete!");
  }).catch((error) => {
    alert(error,"error!");
  });
}

const onResetPassword = () => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("이메일 전송 완료");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    // ..
  });
}

//아바타 변경 기능
const onAvatarChange = async (e) => {
  const { files } = e.target;
  if (!user) return;
  if (files && files.length === 1) {
    const file = files[0];
    const locationRef = ref(storage, `avatars/${user?.uid}`);
    const result = await uploadBytes(locationRef, file);
    const avatarUrl = await getDownloadURL(result.ref);
    setAvatar(avatarUrl);
    await updateProfile(user, {
      photoURL: avatarUrl,
    });
  }
};



let displayName, email, emailVerified ;
if (user !== null) {
    displayName = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;  
}
else {
    setTimeout(() => {
        navigate("/");
      }, 0);
}
function Userinfo() {
    return(
      <UserinfoBackground>
            <UserinfoWrapper>
              <p>닉네임: {displayName}</p> 
              <Btn onClick={onNameChange}>닉네임 변경</Btn>
              <p>이메일: {email}</p>
              <p>이메일 인증 여부: {emailVerified ? '인증됨' : '인증 안됨'}</p>
              <Btn onClick={onSendEmail}>이메일 전송</Btn>
              <br/>
              <Btn onClick={onResetPassword}>비밀번호 초기화</Btn>
              <br/>
              <Btn onClick={onLogout}>로그아웃</Btn>
            </UserinfoWrapper>
      </UserinfoBackground>
          );
};
    return( 
        <div>
        <Navigation/>
        <AvatarWrapper>
        <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Userinfo/>
        </AvatarWrapper>
        






        {isLogout && (
          <ModalBackground>
            <ModalContainer>
              <p>로그아웃 하시겠습니까?</p>
              <button onClick={onSignOut}>확인</button>
              <button onClick={logoutCancel}>취소</button>
            </ModalContainer>
          </ModalBackground>
      )}


        {isNameChange && (
          <ModalBackground>
            <ModalContainer>
              <input type="text" name="userDisplayName" placeholder="Name"id="NewDisplayName"/>
              <button onClick={onAcceptChange}>확인</button>
              <button onClick={nameChangeCancle}>취소</button>
            </ModalContainer>
         </ModalBackground>
      )}
        </div>
    )





}