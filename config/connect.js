const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/cart9')

const connect=()=>{
  const db=mongoose.connection

  db.on('error',(err)=>{
    console.log(err);
  })

  db.once('open',()=>{
    console.log('connected with the database');
  })
}

// const main=async()=>{
//   const x=await mongoose.connect('mongodb://127.0.0.1:27017/cart9')
//   if(x){
//     console.log('connected with db');
//   }
// }

// main().catch(err=>console.log(err))

module.exports=connect