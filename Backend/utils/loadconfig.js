const fs = require('fs');
const { NodeSSH } = require('node-ssh');
const LoadConfig=()=>{
    const config = JSON.parse(fs.readFileSync('./utils/config.js', 'utf-8'));
   
    return config
}
module.exports=LoadConfig