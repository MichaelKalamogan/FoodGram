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

// =======================================
//              LISTENER
// =======================================

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`FoodGram app listening on port: ${port}`)
    })
  })
