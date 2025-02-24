const LoadConfig = require("../utils/loadconfig");
const {AddInstance,GetInstance}=require("../Controllers/Instance_Controller.js")

const { readFileSync } = require("fs");
const { Client } = require("ssh2");

   
const servers = [];

// Initialize SSH connections with Promises
const initializeServers =async () => {
  const serversConfig = await  GetInstance()
  console.log(serversConfig[0].host)
  const connectionPromises = serversConfig.map((serverConfig, index) => {
    return new Promise((resolve, reject) => {
      const client = new Client();

      client
        .on("ready", () => {
          console.log(`Connected to ${serverConfig.host}`);
          servers[index] = client;
          resolve(client); // Resolve when connection is successful
        })
        .on("error", (err) => {
          console.error(`Connection error for ${serverConfig.host}:`, err);
          reject(err); // Reject if there's a connection error
        })
        .connect({
            host: serversConfig[index].host,
            port: serversConfig[index].port,
            username:serversConfig[index].username,
            privateKey:serversConfig[index].key
            
        });

     
    });
  });

  return Promise.all(connectionPromises);
};

//add new server connection into the server pool
const Addserver=async(ser)=>{
  const client = new Client();
const newpro=new Promise((resolve,reject)=>{
  client
  .on("ready", () => {
    console.log(`Connected to ${ser.host}`);
    servers.push(client);
    resolve(client); // Resolve when connection is successful
  })
  .on("error", (err) => {
    console.error(`Connection error for ${ser.host}:`, err);
    reject(err); // Reject if there's a connection error
  })
  .connect({
      host: ser.host,
      port: ser.port,
      username:ser.username,
      privateKey:ser.key
  });
  
})
return  newpro

}

// Fetch server vitals
const fetchVitals = () => {
  const commands = {
    cpu: "mpstat 1 1 | awk '/all/ {print 100 - $NF}'",
    ghz:"lscpu | grep 'Model name'",
    disk: "df --output=used,size -B1 / | awk 'NR==2 {print $1, $2}'",
    memory: "free -b | awk 'NR==2 {print $3, $2}'",
  };
  let GHZ=0;
  servers.forEach((server, index) => {
    if (!server) return;

    Object.entries(commands).forEach(([key, command]) => {
      server.exec(command, (err, stream) => {
        if (err) {
          console.error(`Error executing ${key} command on server ${index}:`, err);
          return;
        }

        let output = "";
        stream
          .on("data", (data) => {
          if(key==='ghz'){
            GHZ= data.toString().split("@")[1].split('G')[0]*1;
           
         
          }
            output += data.toString();
          })
          .on("close", () => {
            console.log(`Server ${index} - ${key} usage:`,key!=='ghz'? output.trim():GHZ);
          })
          .stderr.on("data", (data) => {
            console.error(`Error output from ${key} command on server ${index}:`, data.toString());
          });
      });
    });
  });
};

// Start vitals collection only after all servers are connected
const startVitalsCollection = () => {
  initializeServers()
    .then(() => {
      console.log("All servers connected. Starting vitals collection...");
      fetchVitals(); // Initial fetch
      setInterval(fetchVitals, 5 * 60 * 1000); // Fetch every 5 minutes
    })
    .catch((err) => {
      console.error("Error initializing servers:", err);
    });
};

module.exports = { initializeServers, startVitalsCollection, fetchVitals,Addserver };
