import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeBox from "../routes/Homebox"
import LoginBox from "../routes/Loginbox";
import SignupBox from "../routes/Signupbox";

const Router = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<HomeBox/>}/>
                <Route path="/login" element={<LoginBox/>}/>
                <Route path="/signup" element={<SignupBox/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;