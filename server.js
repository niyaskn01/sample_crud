const express=require('express')
const db=require('./config/connect')
const cors=require('cors')
const userModel=require('./model/userModel')
const multer = require('multer');
const path = require('path');
const app=express()
const port=8080

 db()
 app.use(cors())
 app.use(express.json())
 app.use('/uploads', express.static('uploads'));

//multer
const storage=multer.diskStorage({
  destination:'./uploads',
  filename:function(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

  }
})
const upload=multer({storage:storage})

app.post('/register', upload.single('image'), async (req, res) => {
  const { name } = req.body;

  try {
    if (!name || !req.file) {
      return res.status(400).send({
        message: 'Name and image are required',
      });
    }

    const imagePath = req.file.path;
    const user = await new userModel({ name, image: imagePath }).save();

    res.status(200).send({
      message: 'Registered successfully',
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error in registration',
      err,
    });
  }
});


//get all users
app.get('/get-user',async(req,res)=>{
  try{
    const user=await userModel.find().sort({createdAt:-1})
    res.status(200).send({
      success:true,
      user
    })
  }catch(err){
    console.log(err);
    res.send({
      success:false,
      message:'error in getting users',
      err
    })
  }
})

//delete user
app.delete('/delete-user/:userID',async(req,res)=>{
  const {userID}=req.params
  
  try{
    const user=await userModel.findByIdAndDelete(userID)
    res.status(500).send({
      success:true,
      message:'deleted successfully'
    })
  }catch(err){
    console.log(err);
    res.status(500).send({
      message:'error in deletion',
      err,
      success:false
    })
  }
})

//update user
app.put('/update-user/:userID',async(req,res)=>{
  const {name}=req.body
  const {userID}=req.params
  try{
    const UpdatedUser=await userModel.findByIdAndUpdate(userID,{name})
    res.status(200).send({
      success:true,
      message:'user updated succesfully',
      UpdatedUser
    })
  }catch(err){
    console.log(err);
    res.status(500).send({
      message:'error in updation',
      success:false,
      err
    })
  }  
})

app.listen(port,()=>{
  console.log(`server is running at port ${port}`);
})