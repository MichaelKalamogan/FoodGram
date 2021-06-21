// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express =  require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const recipeController =  require ('./controllers/recipe_controller')
const userController =  require('./controllers/user_controller')
const userRouter = require('./routers/userRouter')
const recipeRouter = require('./routers/recipeRouter')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const multer = require('multer')
const passport = require('passport')
require('express-async-errors');


const app = express();
const port = process.env.PORT || 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`
const { authenticatedOnly, alreadyAuthenticated, verifyUser} = require('./middlewares/auth-middleware');

require('./config/passport-config')(passport)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
app.set('view engine', 'ejs')


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

app.get('/', (req, res) => {res.redirect('/recipes/home')})

app.use('/user', userRouter)

app.use('/recipes', recipeRouter)

//Contact page
app.get('/contact-us', recipeController.contact)

//Feedback post
app.post('/contact-us', recipeController.feedbackCreate)

//Reset password page
app.get('/reset-password/:id/:token', userController.resetPassword)

//submit new password
app.patch('/reset-password/submit', userController.submitResetPassword)

// =======================================
//             Error Handler
// =======================================

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
