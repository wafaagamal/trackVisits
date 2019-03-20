var fs =require ('fs')
const csv =require('csvtojson/v2')
 async function parseCSV(csvFilePath,arr){
    let readStream=require('fs').createReadStream(csvFilePath);
    let json=await csv().fromStream(readStream);

    json = json.map((i)=>{
        let o = {};
        arr.forEach((el)=>{
            o[el]=i[el];    
        })  
        return o;
    });
    return json  
   
}
module.exports={parseCSV}