const mongoose=require("mongoose")
const instanceschema=new mongoose.Schema({
    host:{type:String,require:true},
    port:{type:Number,require:true},
    username:{type:String,require:true},
    key:{type:Buffer,require:true},
    
    createdAt: { type: Date, default: Date.now }
})
const Instance=new mongoose.model("Instance",instanceschema);
module.exports=Instance
