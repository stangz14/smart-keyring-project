import React, { Component,useState } from "react";
// import styled from 'styled-components'
import "../Styles/Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home(){

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);



  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        notify();
        var myHeaders = new Headers();
        let po = `https://www.google.com/maps/place/${latitude},${longitude}`;
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "password": po
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3333/send", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

          const notify = () => toast.success("ขอบคุณสำหรับการแจ้งเหตุ ตอนนี้ทางกู้ภัยกำลังรีบดำเนินการไปหาท่าน", {
        position:"top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
            });
       

  
        return (
            <div className="home" id="home">
              <h3 className="home-text">กดปุ่มเพื่อแจ้งเตือน</h3>
              <div className="button-con">
                <ul className="ul-b">
                  <li style={{ backgroundColor: '#ff0000'}} onClick={getLocation}>อุบัติเหตุทั่วไป</li>              
                  <li style={{ backgroundColor: '#ffff00'}} onClick={getLocation} >อุบัติเหตุทางรถ</li>
                  <li style={{ backgroundColor: '#00d300'}} onClick={getLocation} >แจ้งผู้ป่วยฉุกเฉิน</li>
                </ul>
                <ToastContainer />
              </div>
          </div>
        );
    }

		

export default Home;