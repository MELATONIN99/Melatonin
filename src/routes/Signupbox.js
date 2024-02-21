import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const LogoimgWrapper = styled.div`
display: flex;
  align-items: center;
  img {
    width: 200px;
    height: auto;
  }
  margin-bottom: 20px;
`
const logoimg = "MELATONINLOGO.png";



export default function SignupBox() {
    const navigate = useNavigate();

    const onClcik = (event) => {
        event.preventDefault();
        const displayName = document.getElementById('displayName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const Auth = auth;
        createUserWithEmailAndPassword(Auth, email, password, displayName)
            .then((userCredential) => {
                
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName:displayName,
                })
                console.log(user);
                alert("회원가입 완료 로그인으로 이동");
                setTimeout(() => {
                    navigate("/login");
                  }, 1000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = getErrorMessage(errorCode);
                setTimeout(() => {
                    alert(`오류:${errorMessage}`);
                  }, 1000);
            });
            function getErrorMessage(errorCode) {
                switch (errorCode) {
                  case "auth/user-not-found":
                  case "auth/wrong-password":
                    return "이메일 혹은 비밀번호가 일치하지 않습니다.";
                  case "auth/email-already-in-use":
                    return "이미 사용 중인 이메일입니다.";
                  case "auth/weak-password":
                    return "비밀번호는 6글자 이상이어야 합니다.";
                  case "auth/network-request-failed":
                    return "네트워크 연결에 실패 하였습니다.";
                  case "auth/invalid-email":
                    return "잘못된 이메일 형식입니다.";
                  case "auth/internal-error":
                    return "잘못된 요청입니다.";
                  default:
                    return "로그인에 실패 하였습니다.";
                };
       };
    };
    
    return (
<div className="login-wrapper">
  <LogoimgWrapper>
  <img src={logoimg} alt="logo" />
  </LogoimgWrapper>
    <h2>Signup</h2>
        <form id="login-form">
            <input type="text" name="userDisplayName" placeholder="Name"id="displayName"/>
            <input type="text" name="userName" placeholder="Email" id="email"/>
            <input type="password" name="userPassword" placeholder="Password" id="password"/>
            <button onClick={onClcik} className="lobbybtn" id="signupbtn">Sign Up</button>
            <div className="link-to-account">Already have an account?
            <br/><Link to="/login">Sign in</Link></div>
        </form>
</div>
  
);  
};
