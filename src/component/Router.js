import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeBox from "../routes/homebox"
import LoginBox from "../routes/loginbox";
import SignupBox from "../routes/signupbox";
import Profile from "../routes/profile";
import Momentum from "../routes/momentum";

const Router = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<HomeBox/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/momentum" element={<Momentum/>}/>
                <Route path="/login" element={<LoginBox/>}/>
                <Route path="/signup" element={<SignupBox/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;