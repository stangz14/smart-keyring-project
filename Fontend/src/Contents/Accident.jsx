import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';


function ProfilePage() {
    // Get the userId param from the URL.
    let { userId } = useParams();
    // ...
  }


function Accident() {
  return (
     <Routes>
      <Route path="/users">
        <Route path=":userId" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}





export default Accident