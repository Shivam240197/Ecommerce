import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
          navigate("/")
        }
      })
    const handlelogin=async()=>{
      if(!email || !password){
        setError(true);
        return false;
      }
        console.log(email,password);
        let result=await fetch("http://localhost:5000/login",{
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
              'Content-Type':'application/json'
          }
        });
        result=await result.json();
        console.warn(result);
        if(result.name)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/")
        }
        else
        {
           alert("Enter the correct Details"); 
        }
    }
  return (
    <div>
      <div className='login'>
      <h1>Login</h1>
      <input className='inputBox' type="text" placeholder="Enter email"
        value={email} onChange={(e)=>setEmail(e.target.value)}
      />
      {error && !email && <span className='invalid-input'>*Enter valid email</span>}
      <input className='inputBox' type="Password" placeholder="Enter Password"
        value={password} onChange={(e)=>setPassword(e.target.value)}
      />
      {error && !password && <span className='invalid-input'>*Enter valid password</span>}

      <button onClick={handlelogin} className='appButton' type='button'>LogIn</button>
    </div>
    </div>
  )
}

export default Login
