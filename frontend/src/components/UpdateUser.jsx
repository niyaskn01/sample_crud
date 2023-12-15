import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateUser() {
  const {userID,cname}=useParams() 
  const [name,setName]=useState(cname)
  const navigate=useNavigate()
  //update
  const handleUpdate=async()=>{
    try{
      const {data}=await axios.put(`http://localhost:8080/update-user/${userID}`,{name})
      if(data.success){
        
        setName(data.UpdateUser)
        navigate('/') 
        setTimeout(() => {
          toast.success(data.message)
        }, 300);
        
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="input-group mb-3 ">
    <input
      type="text"
      className="form-control"
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
      onChange={(e)=>{
        setName(e.target.value)
      }}
      value={name}
    />
    
    <button onClick={handleUpdate}
     className="btn btn-outline-secondary" type="button" id="button-addon2">
      Edit
    </button>
  </div>
</div>

  )
}

export default UpdateUser