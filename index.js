const express=require('express')
const cors=require('cors')
//file imports
const initial_Start=require('./components/Recovery')
const {initializeServers, startVitalsCollection, fetchVitals}=require("./components/ServerCon.js")
//backend configs
const app=express();


//actual code


initial_Start();
















const PORT = 3000;
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})