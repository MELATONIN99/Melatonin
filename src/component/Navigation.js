import { Link } from 'react-router-dom'
import { MainLogo, Menu, Nav } from './ComponentStyle'  


const logoimg = "MELATONINLOGO.png";


export default function Navigation() {
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
        <Link className="nav-link" to="/profile">Profile</Link>
        </Menu>
</Nav>
    )
}