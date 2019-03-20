var Visit =require('../models/visit')
var User =require ('../models/user')
module.exports={
    createVisit:function(req,res,next){
        
        if(req.body.code){
         User.findOne({code:req.body.code}).exec(function(err,user){
             if(err)console.log(err);
             if(user){
                let visit=new Visit
                visit.newVisit(user)
                visit.save()
               return res.status(200).send({message:"Success"})
             }
             return res.status(404).send({error:"this user does not exit"})
         })
        }else{
            return res.status(400).send({error:"please inter your ID"})
        }
    }
}