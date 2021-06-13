const LocalStrategy = require('passport-local').Strategy
const { UserModel } = require('../models/user')
const bcrypt = require('bcryptjs')


//using passportjs
module.exports = function (passport) {
    passport.use(new LocalStrategy(
         {usernameField : 'email'}, (email, password, done) => {
           
            UserModel.findOne({ email: email })
                .then (user => {

                    //If no such email, return with a message saying email not registered
                    if(!user) {
                        return done(null, false, {message: 'Email is not registered'})
                    }

                    //If email  =exists, check passwords
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user, {message: 'Successful Login'})
                  
                        } else {
                            return done( null, false, {message: 'Password Incorrect'})
                        }
                    });
                });
        })
    ),

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    }),
  

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
        done(err, user);
        });
    });

}