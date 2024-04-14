
import { auth } from "../firebase/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
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

export default function PasswordReset() {
  const navigate = useNavigate();

  const onClcik = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value
  sendPasswordResetEmail(auth, email)
    .then(() => {
    alert("이메일 전송 완료");
    navigate("/");
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
      default:
        return "이메일 전송 실패";
    };
  };
};

    return (
<div className="login-wrapper">
<LogoimgWrapper>
  <img src={logoimg} alt="logo" />
  </LogoimgWrapper>
  <h2>ResetPassword</h2>
        <form id="login-form">
            <input type="text" name="userName" placeholder="Email" id="email"/>
            <button type="submit" value="Login" className="lobbybtn" onClick={onClcik}>Send Email</button>
            <div className="link-to-account">Don't have an account?
            <br/><Link to="/signup">Sing Up</Link></div>
            <div className="link-to-account">Already have an account?
            <br/><Link to="/login">Sign in</Link></div>
        </form>
</div>
);  
};



