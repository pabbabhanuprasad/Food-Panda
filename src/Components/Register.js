import React,{useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');

    const handleEmail = (event)=>{
        setEmail(event.target.value)
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value)
    }
    const handleApi = ()=>{
        console.log(email,password)
        axios.post('https://reqres.in/api/users?page=2',{
            email:email,
            password:password,
        })
        .then(result => {
            console.log(result.data)
            alert('successfully done')
        }).catch(err =>{
            console.log(err)
            alert('server err')
        })
    }


  return (
    <div>
        <h2>Register</h2>
        Email : <input onChange={handleEmail} value={email} type="text"/>
        Password : <input onChange={handlePassword} value={password} type="text" />
        <button onClick={handleApi}>Register</button>
    </div>
  )
}

export default Register;