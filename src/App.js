import { useEffect, useState } from "react";
import "./App.css";
import Router from "./component/Router.js";
import { auth } from "./firebase/firebase.js";
import styled from "styled-components";
const LoadingScreen = styled.div`

background-color: white;
color: blue;
`
function App() {
  const [isLoding, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  },[]);
  return (
    <div>
 {isLoding ? <LoadingScreen/> :<Router/>}
 </div>
  );
}

export default App;