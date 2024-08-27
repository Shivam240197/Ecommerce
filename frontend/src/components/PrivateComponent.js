import react from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateComponent=()=>{
    const auth=localStorage.getItem('user');
    //return <Outlet/>
    return (auth ? <Outlet/>:<Navigate to="signup"/>)
}
export default PrivateComponent;