import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeBox from "../routes/HomeBox"
import LoginBox from "../routes/LoginBox";
import SignupBox from "../routes/SignupBox";
import Profile from "../routes/Profile";
import Momentum from "../routes/Momentum";
import Diary from "../routes/Diary";

const Router = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<HomeBox/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/momentum" element={<Momentum/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/login" element={<LoginBox/>}/>
                <Route path="/signup" element={<SignupBox/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;