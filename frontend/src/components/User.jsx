import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { LuDelete } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import { Modal } from 'antd';
import {Link} from 'react-router-dom'

function User() {
  
  const [user,setUser]=useState([])
  const getUser=async()=>{
    try{
      const {data}=await axios('http://localhost:8080/get-user')
      if(data.success){
        setUser(data.user)
        console.log(user);
      }
      else{
        toast.error('no user found')
      }
    }catch(err){
      console.log(err);
      toast.error('something went wrong')
    }
  }
  //handle delete
  const HandleDelete=async(pID,userName)=>{
    Modal.confirm({
      title:'delete?',
      content:`are u sure cdyou want to delete ${userName}`,
      
      onCancel(){
        console.log('cancelled')
      },

      async onOk(){
        try{
          const {data}=await axios.delete(`http://localhost:8080/delete-user/${pID}`)
          if(data.success){
            toast.success(data.message)
          }
        }catch(err){
          console.log(err);
        }
      },
      
    })
   
  }

  useEffect(()=>{
    getUser()
  },[getUser])
  return (
    <div>
      {
        user.map((val,ind)=>(
          <>
          <div className='mx-4 mb-3  p-4 text-dark  w-100 d-flex justify-content-between'>
            <h4 
            style={{borderRadius:'5px'}}
            key={val._id}><span className='mx-2'>{ind+1},</span>name :{val.name}</h4>

            <img src={`http://localhost:8080/${val.image}`} style={{width:'150px',height:'150px'}}
             alt="image" />

            <div className='d-flex'>
            <h2 onClick={()=>{
              HandleDelete(val._id,val.name) 
            }} className='mx-4'><LuDelete/></h2>
            <Link to={`/update/${val._id}/${val.name}`}>
              <h2><MdModeEditOutline/></h2>
            </Link>
            </div>
          </div>
          <hr />
          </>
          
        ))
      }
    </div>
  )
}

export default User