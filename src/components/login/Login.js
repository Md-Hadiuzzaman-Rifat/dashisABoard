import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import firebaseInitialize from '../../firebase/firebaseInitialize';

firebaseInitialize()


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error,setError]=useState("")

  const navigate=useNavigate()
  const auth=getAuth();
  const {dispatch}=useContext(AuthContext)

  const handleSubmit=(e)=>{
    e.preventDefault()

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user=userCredential.user
      dispatch({type:"LOGIN", payload:user})
      console.log(user.uid)
      navigate('/')
    })
    .catch((err)=>{
      setError(err)
    })
  }
  
  return (
    <div className="form">
      <h1>This is Login Page</h1>
      <form className="form-data" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button className="form-button" type="submit">Submit Form</button>
      </form>
  <br/>
      <h1>Type Email: hadi@gmail.com</h1>
      <h1>Type Password: hadi123</h1>
    </div>
  );
};

export default Login;
