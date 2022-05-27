
const axios = require("axios");

const baseUrl = "http://localhost:5000";
let cities;

module.exports = cities;

handleMPUpdates();
console.log(cities);
async function handleMPUpdates(){
   

    try {
      console.log("trying to update");
      const data = await axios.get(`${baseUrl}/spreadsheet`);
      
      let temp = data.data;
        
        cities = temp.slice();
       
        
     
     return(cities);
    
    } catch (err) {
      console.log(err.message);
    }



  };