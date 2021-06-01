// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express =  require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const recipeController =  require ('./controllers/recipe_controller')
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/Recipe'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// =======================================
//              ROUTES
// =======================================

// index
app.get('/home', recipeController.index)

// new
app.get('/recipes/new', recipeController.newForm)

// show
app.get('/recipes/:user_id/:id', recipeController.show)

// // create
// app.post('/recipes', recipeController.create)

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
