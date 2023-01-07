import React, {useState, useEffect} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar";
import "../Styles/Profile.css";


function Profile() {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

   

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:3333/authen", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === 'ok'){
          setUser(result.user)
          console.log(user)
        } else {
          navigate('/')
        }
      })
      .catch(error => console.log('error', error));
  }, [])
  return (
    <>
    <Navbar />
    <div className='profile-con'>
      <h1>profile</h1>
      <form  className='login-from'>
      <label>
      <input 
        type="text" 
        name="username"
        placeholder={user.fname} 
        onChange={handleChange}
      />
      </label>
      <label>
        <input 
          type="text" 
          name="txet" 
          placeholder= {user.lname}
          onChange={handleChange}
        />
        </label>
          <input type="submit"  className='button' value="Enter" />
      </form>
    </div>
    </>
  )
}

export default Profile