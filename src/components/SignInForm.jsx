import React, { useState } from 'react';
import useData from '../hooks/useData'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function SignInForm() {

  const [logUName, setLogUName] = useState();
  const [logPwd, setLogPwd] = useState();
  const navigate = useNavigate();
  let { setLoginUser, setLogin } = useData();
  const url = 'http://localhost:5000/signin';

  function login() {

    console.clear();

    const person = {
      userName: logUName,
      pwd: logPwd,
    }

    axios.post(url, person).
      then((res) => {
        if (res.data) {
          navigate("/profile");
          setLoginUser(res.data.userName);
          setLogin(true);
        } else {
          alert("Invalid Email OR Password")
        }
      }).
      catch((err) => {
        console.log(err)
      })


  }


  return (

    <div className='container mt-5'>
      <div className="border border-2 p-3 d-flex flex-column">
        <h1 className='text-center'>Sign In</h1>

        <input className='d-block m-auto mt-3 mx-5' type="text" placeholder='Write Unique UserName' onChange={(e) => { setLogUName(e.target.value) }} />
        <input className='d-block m-auto mt-3 mx-5' type="password" placeholder='Password' onChange={(e) => { setLogPwd(e.target.value) }} />

        <button className="btn btn-primary d-block mt-3 mx-5" onClick={login}>Login</button>

        <span className='d-block text-center mt-3'> <Link to={'/signup'}>don't have an account ?</Link> </span>
      </div>
    </div>


  )
}
