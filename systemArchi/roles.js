var hirarical = {
	admin: ['supervisor']	
}
 
var roles = {
    admin: {
        name: 'admin',
        maxTicketUsagePerHour: 3,
        maxLogins:50000,
        ticketValidationInDays:3

    },
    supervisor:{
        name:'supervisor',
        maxTicketUsagePerHour: 100,
        maxLogins:1,
        ticketValidationInDays:3	

    },
    user:{
        name:'user'
    }
}
function getRole(role){
  if(roles.includes(role)) {
      return roles[role]
  }
}
function getMaxUse(role){
return roles[role].maxTicketUsagePerHour
}
module.exports = {
    roles,
    getRole,
    hirarical,
    getMaxUse
}