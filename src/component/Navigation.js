import { Link, useNavigate } from 'react-router-dom'
import { MainLogo, Menu, Nav } from './ComponentStyle'  
import { auth } from '../firebase/firebase';
import { useEffect } from 'react';


const logoimg = "MELATONINLOGO.png";


export default function Navigation() {
  const navigate = useNavigate();
  const user = auth.currentUser
  useEffect(() => {
    if(user === null){
        navigate("/login")
    }
  },{})
return(

<Nav>
  <MainLogo>
    <Link className="" to="/">
    <img src={logoimg} alt='logo'/>
    </Link>
    </MainLogo>

      <Menu>
        <Link className="nav-link" to="/">Home</Link>
      </Menu>
      
      <Menu>
        <Link className="nav-link" to="/momentum">Momentum</Link>
      </Menu>
      
      <Menu>  
        <Link className="nav-link" to="/diary">Diary</Link>
      </Menu>

      <Menu>
        <Link className="nav-link" to="/profile">Profile</Link>
      </Menu>
</Nav>
    )
}