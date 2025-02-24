const {DB}=require('./ConnectDb.js')
const fs=require("fs")
const {initializeServers, startVitalsCollection, fetchVitals,Addserver}=require("./ServerCon.js")

const {AddInstance,GetInstance}=require("../Controllers/Instance_Controller.js")
const initial_Start=async()=>{
    //When Server Restart or Start For The first time it will run 


 const db=new DB();

   await db.ConnectDb();
   const key=  fs.readFileSync("D:\\ssh keys\\monitoring.pem")
 const d={
   host:"54.89.177.116",
   port:22,
   username:"ubuntu",
   key:key

 }
 
   Addserver(d).then(()=>{
      fetchVitals()   
      })







//  const key=  fs.readFileSync("D:\\ssh keys\\monitoring.pem")

//  const ins_data={
//    host:"54.89.177.116" ,
//    port:22,
//    username:"ubuntu",
//    key:key
//   }
//  //AddInstance(ins_data);
//  GetInstance()
  


 




// const cli=await MongoConnect

// console.log(cli)
// // .then((client)=>{
// //    console.log(client)
// //    addinstance()
// //initializeServers().then(()=>{
// //    fetchVitals()   
// //})
// //})
}
module.exports=initial_Start