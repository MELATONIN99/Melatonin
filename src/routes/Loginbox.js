import { signInWithEmailAndPassword } from "firebase/auth";
import Logout from '../component/Logout.js';
import { auth } from "../firebase/firebase.js";
import { Link, useNavigate } from "react-router-dom";


export default function LoginBox() {
  const navigate = useNavigate();

  const onClcik = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("로그인 완료 홈페이지로 이동");
    setTimeout(() => {
      navigate("/");
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
      default:
        return "이메일 혹은 비밀번호가 일치하지 않습니다.";
    };
  };
};

    return (
<div className="login-wrapper">
  <h1>Melatonin.</h1>
  <h2>Login</h2>
        <form id="login-form">
            <input type="text" name="userName" placeholder="Email" id="email"/>
            <input type="password" name="userPassword" placeholder="Password" id="password"/>
            <button type="submit" value="Login" onClick={onClcik}>Login</button>
            <div className="link-to-account">Don't have an account?
            <br/><Link to="/signup">Sing Up</Link></div>
        </form>
</div>
  
);  
};



