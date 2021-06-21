const express = require('express')
const router = express.Router()
const userController =  require('../controllers/user_controller')
const recipeController =  require ('../controllers/recipe_controller')
const methodOverride = require('method-override');
const { upload } = require('../config/multer-config')
const { authenticatedOnly, alreadyAuthenticated, verifyUser, logoutUser} = require('../middlewares/auth-middleware');

//User login page
router.get('/login', alreadyAuthenticated, userController.index)

//Login the user
router.post('/login', alreadyAuthenticated, userController.login) 

//Logout
router.delete('/logout', logoutUser, recipeController.logout)

//User register form
router.get('/register', alreadyAuthenticated, userController.new)

//Register the new User
router.post('/register', alreadyAuthenticated, userController.create)

//Forgot password page
router.get('/forgot-password', userController.forgotPassword)

//submit email to get reset password link
router.post('/forgot-password', userController.submitForgotPassword)

//User Dashboard
router.get('/:user_id/dashboard', authenticatedOnly, verifyUser, userController.dashboard)

//Page to edit the user Profile
router.get('/:user_id/dashboard/editprofile', authenticatedOnly, verifyUser, userController.editDashboard)

//Update the user Profile
router.patch('/:user_id/dashboard/editprofile', authenticatedOnly, verifyUser, userController.updateDashboard)

//Page to edit the user photo
router.get('/:user_id/dashboard/editprofilephoto', authenticatedOnly, verifyUser, userController.editProfilePhoto)

//Update the user photo
router.patch('/:user_id/dashboard/editprofilephoto', authenticatedOnly, verifyUser, upload.single("newImage"), userController.updateProfilePhoto)

//delete one of the user's recipe
router.delete('/:user_id/:id/delete', authenticatedOnly, verifyUser, recipeController.delete)


module.exports = router