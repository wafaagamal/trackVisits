let User =require('../models/user')
let Security = require('../auth.js')
let Roles =require('../systemArchi/roles')
module.exports={

  register : function(req,res,next){
       if(req.body.email&& req.body.name){
           User.findOne({email:req.body.email}).exec(async function(err,user){
               if(err)console.log(err);
               if(!user){
                let userObj=new User
                userObj.register(req.body)
                 userObj.save(result=>{
                     if(result){
                         next()
                     }
                 })
                return res.status(200).send({message:"Users register successfully"})
              
            }else{
                return res.status(400).send({error:"already exists"})
            }

           })
       }else{
        return res.status(400).send({error:"missing name or email"})
       }
    
   },
   registerStaff:function(role){
    return function(req,res,next){
      if(req.body.email&&req.body.password){
         User.findOne({email:req.body.email}).exec(function(err,user){
             if(err) console.log(err);
             if(!user){
               let userObj=new User
               if(Roles.roles.admin.name==role){
                userObj.registerAdmin(req.body)
                userObj.save()
                return res.status(200).send({message:"admin added"})
               }
               if(Roles.roles.supervisor.name==role){
                userObj.registerSupervisor(req.body)
                userObj.save()
                return res.status(200).send({message:"supervisor added"})
               }
             }else{
                return res.status(400).send({error:"already exists"})
            }
             
         })
      }else{
        return res.status(400).send({error:"missing email or password"})
       }
    }
  },
    access:function(req,res,next){
        if(req.body.email&& req.body.password ){
            User.findOne({email:req.body.email}).exec(function(err,result){
                if(err)console.log(err);
                if(result){ 
                     if(result.comparePass(req.body.password)){
                         Security.generateTicketData(result.getTicketData(),function(ticket){
                            result.password=undefined
                            return res.status(200).send({user:result,ticket:ticket})
                         })
                         
                    } else{
                    return res.status(400).send({error: 'invalid password'});
                    }        
                }else{
                    return res.status(404).send({error: 'email does not exit'});
                 }
                 
              })
         
        }else{
      return  res.status(400).send({error: 'missing email or password'});
        }
    }


}