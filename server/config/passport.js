const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../controller/controller');
const config = require('../config/database');

module.exports = function(passport){
    //console.log("passportdata", passport);
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//console.log("jwt data", opts.jwtFromRequest)
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    console.log("payload",jwt_payload)
    User.getUserById(jwt_payload._id, (err, user) => {
        if(err){
            console.log("error passport")
            return done(err, false);
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}))
}