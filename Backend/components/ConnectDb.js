const mongoose=require("mongoose")
const { readFileSync }=require("fs")


class DB{
constructor(){
    this.isconnected=false
}


 ConnectDb=async ()=>{
 
    if(this.isconnected){
        return mongoose.connect
    }
    
    try
   {
    await mongoose.connect("mongodb+srv://haris:Haris2425236@cluster0.viow7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
     this.isconnected=true;
     console.log("MongoDB is connected")
     return mongoose.connect
   }
   catch(err){
    console.log("error on mongo connection")
   }
 }

}








//const addinstance=()=>{
//    console.log("instance is adding")
//    const instance_db=MongoConnect.db("monitoring")
//    const instance_collection=instance_db.collection("instances");
//    const privateKey=readFileSync("D:\\ssh keys\\Test1key.pem")
//    console.log(privateKey)
//}


module.exports={DB}