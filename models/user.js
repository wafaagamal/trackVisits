var mongoose = require('mongoose');
const uuid = require('uuid/v4');
let bcrypt = require('bcryptjs') 
let Roles  =require('../systemArchi/roles')  
var User = mongoose.Schema({
    email                : { type: String},
    name                 : { type: String},
    password             : { type: String},
    createdAt            : { type: Date, default: Date.now },
    code                 : { type: String},
    role                 : { type: String, default:Roles.roles.user.name},
},{ usePushEach: true })
User.methods.register=function(object){
  this.email=object.email
  this.name=object.name
  this.code=uuid()
}
User.methods.registerAdmin=function(object){
    this.email=object.email
    this.name=object.name
    this.password=this.generateHash(object.password)
    this.role=Roles.roles.admin.name
}
User.methods.registerSupervisor=function(object){
    this.email=object.email
    this.name=object.name
    this.password=this.generateHash(object.password)
    this.role=Roles.roles.supervisor.name
}
User.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
User.methods.comparePass=function(password){
    if(!this.password) return false;
    return bcrypt.compareSync(password,this.password)
}
User.methods.getTicketData = function(){
	var data = {};
    data._id = this._id;
    data.role = this.role;
	return data; 
}

User.pre('save', function() {
	this.createdAt = new Date();
});

module.exports = mongoose.model('User', User);