import { getAuth } from "firebase/auth";
import Navigation from "../component/Navigation";
import { useNavigate } from "react-router-dom";

export default function HomeBox() {
const auth = getAuth();
const user = auth.currentUser;
const navigate = useNavigate();

let displayName, email, photoURL, emailVerified, uid;
if (user !== null) {
    displayName = user.displayName;
    email = user.email;
    photoURL = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  
}
else {
    alert("사용자 정보 없음");
    setTimeout(() => {
        navigate("/login");
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
        <h1>홈입니다.</h1>
        <Userinfo/>
        <div></div>
        </div>
    )

}