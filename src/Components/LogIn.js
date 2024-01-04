import React, { useState, useRef, useEffect,useContext } from "react";
import AuthContext from "../context/AuthProvider"
import axios from "../api/axios";
const LOGIN_URL = '/auth';

const LogIn = () => {
    const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
     userRef.current.focus();
   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
        {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    console.log(JSON.stringify(response?.data));
    //console.log(JSON.stringify(response));
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    setAuth({user,pwd,roles,accessToken});
    setUser('');
    setPwd('');
    setSuccess(true);

    }catch(err){
        if(!err?.response){
            setErrMsg('No Server Response');
        }else if(err.response?.status === 400){
            setErrMsg('Missing Username or Password')
        }else if(err.response?.status === 401){
            setErrMsg('UnAuthorized')
        }else{
            setErrMsg('Login Failed')
        }
        errRef.current.focus();
    }
    
  }

  return (
    <>
    {success ? ( 
    <section>
        <h1>You are Logged In!</h1>
        <br/>
        <p>
            <a href="#">Go to Home</a>
        </p>
    </section>) : (
    
    <section>
        <p ref={errRef} className={errMsg ? "errMsg" :
        "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <lable htmlFor="username">UserName : </lable>
          <input
            type="text"
            id="username"
            value={user}
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <lable htmlFor="password">Password : </lable>
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            id="password"
            required
          />
        </div>

        <button>LogIn</button>
      </form>
      <p>
        Nedd an Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Register</a>
        </span>
      </p>
    </section>
  )}
  </>
  );
};

export default LogIn;
