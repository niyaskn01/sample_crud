const mongoose=require('mongoose')
const schema=mongoose.Schema

const userSchema=new schema({
  name:{
    type:String
  },
  image:{
    type:String
  }
},{timestamps:true})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel