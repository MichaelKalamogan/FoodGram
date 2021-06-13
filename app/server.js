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
const multer = require('multer')
const passport = require('passport')
const { upload } = require('./config/multer-config')
const jwt = require('jsonwebtoken')
require('express-async-errors');


const app = express();
const port = process.env.PORT || 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`
const { authenticatedOnly, alreadyAuthenticated, verifyUser} = require('./middlewares/auth-middleware');
const recipe = require('./models/recipe')
const user = require('./models/user')

require('./config/passport-config')(passport)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

// =======================================
//              MIDDLEWARES
// =======================================

// setting up middleware to support sessions
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
  res.locals.success_message = ""
  res.locals.error_message = ""
  next();
});

// =======================================
//              ROUTES
// =======================================

app.get('/', (req, res) => { res.redirect('/recipes/home')})

// create a new recipe
app.post('/recipes', authenticatedOnly, upload.single("newImage"), recipeController.create)

// Homepage, accessible to all
app.get('/recipes/home', recipeController.index)

//Home page after logout
app.get('/recipes/logout', recipeController.logout)

//Contact page
app.get('/contact-us', recipeController.contact)

//Feedback post
app.post('/contact-us', recipeController.feedbackCreate)

// form to make a new recipe
app.get('/recipes/new',authenticatedOnly, recipeController.new)

app.post('/recipes/filter',recipeController.filter)

// show the full recipe
app.get('/recipes/:id', recipeController.show)

//insert a review
app.patch('/recipes/:id', authenticatedOnly, recipeController.addReview)

//User login page
app.get('/user/login', alreadyAuthenticated, userController.index)

//Login the user
app.post('/user/login', alreadyAuthenticated, userController.login) 

//User register form
app.get('/user/register', alreadyAuthenticated, userController.new)

//Register the new User
app.post('/user/register', alreadyAuthenticated, userController.create)

//Forgot password page
app.get('/user/forgot-password', userController.forgotPassword)

//submit email to get reset password link
app.post('/user/forgot-password', userController.submitForgotPassword)

//Reset password page
app.get('/reset-password/:id/:token', userController.resetPassword)

//submit new password
app.patch('/reset-password/submit', userController.submitResetPassword)

//User Dashboard
app.get('/user/:user_id/dashboard', authenticatedOnly, verifyUser, userController.dashboard)

//Page to edit the user Profile
app.get('/user/:user_id/dashboard/editprofile', authenticatedOnly, verifyUser, userController.editDashboard)

//Update the user Profile
app.patch('/user/:user_id/dashboard/editprofile', authenticatedOnly, verifyUser, userController.updateDashboard)

//Page to edit the user photo
app.get('/user/:user_id/dashboard/editprofilephoto', authenticatedOnly, verifyUser, userController.editProfilePhoto)

//Update the user photo
app.patch('/user/:user_id/dashboard/editprofilephoto', authenticatedOnly, verifyUser, upload.single("newImage"), userController.updateProfilePhoto)

//Page to edit user's recipe
app.get('/recipe/:user_id/:id/editrecipe', authenticatedOnly, verifyUser, userController.updateRecipeForm)

//Update the recipe
app.patch('/recipe/:user_id/:id/editrecipe', authenticatedOnly, verifyUser, upload.single("newImage"), userController.updateRecipe)

//change the photo of the recipe
app.get('/recipe/:user_id/:id/editrecipephoto',authenticatedOnly, verifyUser, recipeController.editPhotoForm)

//change the photo of the recipe
app.patch('/recipe/:user_id/:id/editphoto',authenticatedOnly, verifyUser, upload.single("newImage"), recipeController.editPhoto)

//delete the recipe
app.delete('/user/:user_id/:id/delete', authenticatedOnly, verifyUser, recipeController.delete)


//Logout
app.delete('/user/logout', async (req, res) => {
  req.logOut()
  req.session.destroy()
  res.redirect('/recipes/logout')

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
