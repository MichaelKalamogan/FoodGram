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
const flash  = require('express-flash');
const passport = require('passport')

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/FoodGram'
const { authenticatedOnly, alreadyAuthenticated} = require('./middlewares/auth-middleware');

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
  res.locals.isAuthenticated = req.isAuthenticated ();
  next();
})


// =======================================
//              ROUTES
// =======================================

// index
app.get('/recipes/home', recipeController.index)

// new
app.get('/recipes/new',authenticatedOnly, recipeController.new)

// show
app.get('/recipes/:user_id/:id',  recipeController.show)

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
app.get('/user/dashboard', authenticatedOnly, userController.dashboard)

//Logout
app.delete('/user/logout', async (req, res) => {
  req.logOut()
  req.session.destroy()
  res.send('logged out')
})

//Error Handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// // edit
// app.get('/recipes/:slug/edit', recipeController.editForm)

// // update
// app.patch('/recipes/:slug', recipeController.update)

// // delete
// app.delete('/recipes/:slug', recipeController.delete)

// product rating routes

// app.get('/recipes/:slug/ratings/new', productRatingController.newForm)

// app.post('/recipes/:slug/ratings', productRatingController.create)

// users

// app.get('/users/register', guestOnlyMiddleware, userController.registerForm)

// app.post('/users/register', guestOnlyMiddleware,  userController.registerUser)

// app.get('/users/login', guestOnlyMiddleware, userController.loginForm)

// app.post('/users/login', guestOnlyMiddleware, userController.loginUser)

// app.get('/users/dashboard', authenticatedOnlyMiddleware, userController.dashboard)

// app.post('/users/logout', authenticatedOnlyMiddleware, userController.logout)

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
