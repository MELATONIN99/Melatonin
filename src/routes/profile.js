import { getAuth, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import Navigation from "../component/Navigation";
import { useNavigate } from "react-router-dom";
import { ModalBackground, ModalContainer } from "../component/TodoList";
import { useState } from "react";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";





const AvatarWrapper = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: center;
`
const AvatarUpload = styled.label`
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
display: flex;
  align-items: center;
  justify-content: center;
  background-color: #343434;
  max-width: 400px; /* 최대 너비 설정 */
  max-height: 350px;
  width: 300px;
  margin: 2% auto; /* 수평 가운데 정렬을 위해 margin-left와 margin-right를 auto로 설정 */
  padding: 2%;
  height: 100vh;
`

const UserinfoWrapper = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3c3c3c;
  max-width: 400px; /* 최대 너비 설정 */
  max-height: 380px;
  width: 300px;
  margin: 5% auto; /* 수평 가운데 정렬을 위해 margin-left와 margin-right를 auto로 설정 */
  padding: 5%;
  height: auto;
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
      navigate("/");
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
    console.log("update complete!");
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
              <p>이름: {displayName}</p> 
              <button onClick={onNameChange}>이름변경</button>
              <p>Email: {email}</p>
              <p>Email 인증 여부: {emailVerified ? '인증됨' : '인증 안됨'}</p>
              <button onClick={onSendEmail}>이메일 전송</button>
              <br/>
              <button onClick={onLogout}>Logout</button>
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