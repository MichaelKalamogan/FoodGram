const express = require('express')
const router = express.Router()
const userController =  require('../controllers/user_controller')
const recipeController =  require ('../controllers/recipe_controller')
const methodOverride = require('method-override');
const { upload } = require('../config/multer-config')
const { authenticatedOnly, alreadyAuthenticated, verifyUser} = require('../middlewares/auth-middleware');

// create a new recipe
router.post('/', authenticatedOnly, upload.single("newImage"), recipeController.create)

// Homepage, accessible to all
router.get('/home', recipeController.index)

// form to make a new recipe
router.get('/new',authenticatedOnly, recipeController.new)

router.get('/logout', recipeController.logout)

//filter the recipe by tags
router.post('/filter',recipeController.filter)

// show the full recipe
router.get('/:id', recipeController.show)

//insert a review
router.patch('/:id', authenticatedOnly, recipeController.addReview)

//Page to edit user's recipe
router.get('/:user_id/:id/editrecipe', authenticatedOnly, verifyUser, userController.updateRecipeForm)

//Update the recipe
router.patch('/:user_id/:id/editrecipe', authenticatedOnly, verifyUser, upload.single("newImage"), userController.updateRecipe)

//change the photo of the recipe
router.get('/:user_id/:id/editrecipephoto',authenticatedOnly, verifyUser, recipeController.editPhotoForm)

//change the photo of the recipe
router.patch('/:user_id/:id/editphoto',authenticatedOnly, verifyUser, upload.single("newImage"), recipeController.editPhoto)

module.exports = router