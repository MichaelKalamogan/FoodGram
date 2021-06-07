// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express =  require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const recipeController =  require ('./controllers/recipe_controller')
const userController =  require('./controllers/user_controller')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport')

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/FoodGram'
const { authenticatedOnly, alreadyAuthenticated, verifyUser} = require('./middlewares/auth-middleware');

require('./config/passport-config')(passport)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
app.set('view engine', 'ejs')

// =======================================
//              MIDDLEWARES
// =======================================
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

//Used to show the appropriate Login/Logout links
app.use((req, res, next) => {
  if(req.isAuthenticated) {
    res.locals.user = req.user
  }
  next();
})

//To flash the appropriate success or error messages
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.suggestion = req.flash('suggestion');
  next();
});


// =======================================
//              ROUTES
// =======================================

// index
app.get('/recipes/home', recipeController.index)

// new
app.get('/recipes/new',authenticatedOnly, recipeController.new)

//Edit recipe
app.get('/user/:user_id/:id/edit',authenticatedOnly, verifyUser, userController.editRecipe)

// show
app.get('/recipes/:user_id/:id', recipeController.show)

// create
app.post('/recipes', authenticatedOnly, recipeController.create)

//User login page
app.get('/user/login', alreadyAuthenticated, userController.index)

//Login the user
app.post('/user/login', alreadyAuthenticated, userController.login) 

//User register form
app.get('/user/register', alreadyAuthenticated, userController.new)

//Register the new User
app.post('/user/register', alreadyAuthenticated, userController.create)

//User Dashboard
app.get('/user/:user_id/dashboard', authenticatedOnly, userController.dashboard)



//Logout
app.delete('/user/logout', async (req, res) => {
  req.logOut()
  req.flash('success_message', 'Successfully Logged Out.') //this is not coming out 
  res.redirect('/recipes/home')
  req.session.destroy()

})

//Error Handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// =======================================
//              LISTENER
// =======================================

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`FoodGram app listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
