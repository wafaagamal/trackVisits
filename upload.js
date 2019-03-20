var parse = require ('./convertCSV')
var request = require('request');
let csvFilePath='/home/brightmoon/Desktop/textdata.csv'
let arr=["name","email"]


async function upload(){
    console.log("=====inside upload ======");
    
       let users=await parse.parseCSV(csvFilePath,arr)
     // console.log(JSON.stringify(users),"===============JSON OBJECT===================");
       if(users){
        users.map(async (user)=>{      
            let option={
                url: "http://localhost:3000/create/user",
                method:'POST',
                json: true,
                body: user
            }

            return new Promise(function (resolve, reject) {
                request(option, function (error, res, body) {
                    if(error){
                        return reject(error)
                    }
                    return resolve(body)
                })
            })
         })
       }else{
        console.log("there is no users to register")
       }
      
    console.log("Users register successfully")
}
// upload(csvFilePath,arr)
module.exports={upload}