import { useEffect, useState } from "react";
import "./App.css";
import Router from "./component/Router.js";
import { auth } from "./firebase/firebase.js";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {ko} from 'date-fns/locale/ko';
const LoadingScreen = styled.div`

background-color: white;
color: blue;
`
function App() {
  const [isLoding, setisLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setisLoading(false);
  };
  useEffect(() => {
    init();
    const user = auth.currentUser
  },[]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
    <div>
 {isLoding ? <LoadingScreen/> :<Router/>}
 </div>
 </LocalizationProvider>
  );
}

export default App;