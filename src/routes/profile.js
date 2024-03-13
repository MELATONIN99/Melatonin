import { getAuth, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import Navigation from "../component/Navigation";
import { useNavigate } from "react-router-dom";
import { ModalBackground, ModalContainer } from "../component/TodoList";
import { useState } from "react";

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;
const navigate = useNavigate();
const [isLogout, setIsLogout] = useState(false);
const [isNameChange,setIsNameChange] = useState(false);

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


let displayName, email, photoURL, emailVerified, uid;
if (user !== null) {
    displayName = user.displayName;
    email = user.email;
    photoURL = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  
}
else {
    setTimeout(() => {
        navigate("/");
      }, 0);
}
function Userinfo() {
    return(
            <div>
              <p>이름: {displayName}</p> 
              <button onClick={onNameChange}>이름변경</button>
              <p>Email: {email}</p>
              <p>프로필 사진: {photoURL ?? '등록된 사진 없음' }</p>
              <p>Email 인증 여부: {emailVerified ? '인증됨' : '인증 안됨'}</p>
              <button onClick={onSendEmail}>이메일 전송</button>
              <p>UID: {uid}</p>
            </div>
          );
};
    return( 
        <div>
        <Navigation/>
        <h1>프로필입니다.</h1>
        <Userinfo/>
        <button onClick={onLogout}>Logout</button>
    






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