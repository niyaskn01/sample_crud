import React, { Suspense, lazy, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';


function Register() {
  const [name, setName] = useState('');
  const [file,setFile]=useState('')
  const fileInputRef = useRef(null);
  const UserLazy=lazy(()=>import('../components/User'))

  const handleClick = async (e) => {
    e.preventDefault();
    const formdata=new FormData();
    formdata.append('name',name)
    formdata.append('image',file)

    console.log('image file :',file);
    try {
      const { data } = await axios.post('http://localhost:8080/register', formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success) {
        
        toast(data.message, {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: '#03fc18',
            color: '#fff',
          },
        });
        setName('');
        setFile('')
        fileInputRef.current.value=''
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error('Error in server');
    }
  };

  const handleFileChange=(e)=>{
    setFile(e.target.files[0])
  }

  return (
    <div>
      <form className='p-5' method="post" enctype="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder='enter username'
            onChange={(e) => setName(e.target.value)}
          />
          <label className='btn btn-outline-secondary mt-3 mx-3'>upload image
            <input type="file" hidden ref={fileInputRef} name='image' onChange={handleFileChange} />
          </label>
          <button onClick={handleClick} className="btn btn-outline-primary mt-3">
            Submit
          </button>
        </div>
      </form>

      <div>
        <Suspense fallback={
          <div>
            loading....
          </div>
        }>
          <UserLazy/>
        </Suspense>
      </div>
    </div>
  );
}

export default Register;
