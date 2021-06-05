module.exports = {

    authenticatedOnly: (req, res, next) => {
        // if session is valid, go to the next stage
        if (req.isAuthenticated()) {
            
            return next();
        }

        res.redirect('/user/login')
    },

    alreadyAuthenticated: (req, res, next) => {
        // if is not logged-in, allow request to proceed
        if (req.isAuthenticated()) {
          return res.redirect('/user/dashboard')
        }
        next()
    }    

}