import { useState } from 'react';

import {Navigate, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../Styles/Register.css'



function Rigister() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": inputs.email,
    "password": inputs.password,
    "fname": inputs.fname,
    "lname": inputs.lname
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3333/register", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.status === 'ok') {
            MySwal.fire({
                html: <i>{result.message}</i>,
                icon: 'success'
            }).then((value) => {
                navigate('/login')
            });
        } else {
            MySwal.fire({
                html: <i>{result.message}</i>,
                icon: 'error'
            })
        }
    })
    .catch(error => console.log('error', error));
  }
  return (
    <>
    <div className='re-box'>
      <h5>ลงทะเบียน</h5>
      <form onSubmit={handleSubmit}>
      <label>
      <input 
        type="text" 
        name="email" 
        placeholder="email"
        value={inputs.email || ""} 
        onChange={handleChange}
      />
      </label>
      <label>
        <input 
          type="password" 
          name="password" 
          placeholder="password"
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="fname" 
            placeholder="First name"
            value={inputs.fname || ""} 
            onChange={handleChange}
        />
        </label>
        <label>
        <input 
            type="text" 
            name="lname" 
            placeholder="Last name"
            value={inputs.lname || ""} 
            onChange={handleChange}
        />
        </label>
        <input type="submit" value="submit"/>
    </form>
    <div className='a-box'>
      <a href='/login'>หากมีบัญชีอยู่แล้ว</a>
    </div>
    </div>
    </>
  )
}

export default Rigister