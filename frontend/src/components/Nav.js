import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Pic from "../Assets/pic.jpg"
function Nav() {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <img className="logo" src={Pic} alt="logo" />
        <span className="logo-name">Yadav Mart</span> {/* Add your website name here */}
      </div>
    {
        auth?
        <ul className='nav-ul'>
          <li><Link to="/">Product</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup">Logout [{JSON.parse(auth).name}]</Link></li>
        </ul>
        :
        <ul className='nav-ul nav-right'>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    }
    </div>
  )
}

export default Nav
