var users              = require('./routes/user');
var visits             = require('./routes/visit')
module.exports = function (app) {
    app.use(users);
    app.use(visits)
}
