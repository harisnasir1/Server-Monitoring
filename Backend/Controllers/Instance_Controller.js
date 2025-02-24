const { readFileSync }=require("fs")
const Instance=require("../Models/Instance_model")
const AddInstance=async(ins_data)=>{
    console.log("heli")
    const inst=new Instance(ins_data);
    await inst.save();
    console.log("Data is sucssfully added into the database")
}
const GetInstance=async()=>{
    try {
        
        // Retrieve all documents from the "instances" collection
        const instances = await Instance.find({});
        
        return instances
      } catch (error) {
        console.error('Error fetching instances:', error);
      }
}
module.exports={AddInstance,GetInstance}