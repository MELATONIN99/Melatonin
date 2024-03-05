import { getAuth, signOut } from "firebase/auth";
import Navigation from "../component/Navigation";
import { useNavigate } from "react-router-dom";
import { ModalBackground, ModalContainer } from "../component/TodoList";
import { useState } from "react";

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;
const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState(false);

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

const onClick = () => {
    setIsModalOpen(true);
}

const handleCancel = () => {
    setIsModalOpen(false);
  };


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
              <p>Email: {email}</p>
              <p>프로필 사진: {photoURL ?? '등록된 사진 없음' }</p>
              <p>Email 인증 여부: {emailVerified ? '인증됨' : '인증 안됨'}</p>
              <p>UID: {uid}</p>
            </div>
          );
};
    return( 
        <div>
        <Navigation/>
        <h1>프로필입니다.</h1>
        <Userinfo/>
        <button onClick={onClick}>Logout</button>
    






        {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <p>로그아웃 하시겠습니까?</p>
            <button onClick={onSignOut}>확인</button>
            <button onClick={handleCancel}>취소</button>
          </ModalContainer>
        </ModalBackground>
      )}
        </div>
    )

}