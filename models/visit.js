var mongoose = require('mongoose');

var Visit = mongoose.Schema({
    userID      : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visitedAt   : { type: Date, default: Date.now }
},{ usePushEach: true })
Visit.methods.newVisit=function(user){
 this.userID=user._id
}
Visit.pre('save', function() {
	this.visitedAt = new Date();
});
module.exports = mongoose.model('Visit', Visit);
