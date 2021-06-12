const bcrypt = require('bcryptjs')
const { UserModel } = require('../models/user')
const { RecipeModel } = require ('../models/recipe')
const cloudinary = require('../config/cloudinary-config')
const multer =  require('multer')
const { streamUpload } = require('../config/multer-config')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const passport = require('passport')
const crypto = require('crypto')
const user = require('../models/user')


module.exports = {

    //login page for user
    index: (req, res) => {

        res.render('login')
    },

    //for to register new user
    new: (req, res) => {
        res.render('register')
        
    },

    //creating the new user in the database
    create: async (req, res) => {
        
        const { user_id, name, email, password, password2 } = req.body

        //creating an errors array to display all the errors
        let errors = []

        //ensuring all fields are filled up
        if(!user_id ||  !name || !email || !password || !password2) {
            errors.push('All fields are required to be filled up.')
        }

        //ensuring the user knows the password being keyed in
        if (password !== password2) {
            errors.push("Passwords don't match.")
        }

        //showing the users the errors that preventing the registration from being submitted
        if (errors.length > 0) {

            //re-render the registration site but keep the details in the form less password
            res.render('register', {
                errors: errors,
                user_id: user_id,
                name: name,
                email: email,
                password: password,
                password2: password2
            })

        } else { 
            //if no errors in form
            
            //checking if the user id or email already exists
            await UserModel.findOne({
                $or: [{user_id: user_id}, {email: email}]
            })
                .then(async user => {
                    if(user) {
                        if(user.user_id === user_id) {
                            // inform that user id is already taken    
                            errors.push('User Id already taken. Please use a different User Id.')
                            res.render('register', {
                                errors: errors,
                                name: name,
                                email: email,
                            })

                        } else if (user.email === email) {
                        // inform that email is already registered
                            errors.push('Email is already registered. Please log in instead.')
                            res.render('register', {
                                errors: errors,
                                ser_id: user_id,
                                name: name,
                                email: email,
                            })
                        
                        }
                    } else {
                        //if no such user

                        //Hash the password using bcrypt and saltrounds of 10
                        const hash = bcrypt.hashSync(password, 10);

                        //Register the new User
                        UserModel.create({
                            user_id: user_id,
                            name: name,
                            email: email,
                            password: hash
                        })
                            .then(user => {
                            req.flash('success_message', 'Successfully Registered. Please Login and visit your dashboard to update your profile.')
                            res.render('login', {success_message: req.flash('success_message')})
                                
                            })
                    }
                })         
        }
    },

    //Login the user
    login: (req, res, next) => { 
        passport.authenticate('local', { 
          successRedirect: '/recipes/home',
          failureRedirect: '/user/login',
          failureFlash: true}) (req,res,next)
    },

    //Page to submit email to reset password
    forgotPassword: (req, res) => {
        res.render('forgot-password')
    },

    //Submitting the email details to get the password reset token sent to the user's email address
    submitForgotPassword: async (req, res, next) => {

        const { email } = req.body

        const resetUser = await UserModel.findOne({email: email})

        if(!resetUser) {
            req.flash('error_message', 'Email not registered. Please register')
            res.render('register', {error_message:  req.flash('error_message')})

        } else {
            let resetToken = process.env.JWT_SECRET + resetUser.password
            const payload = {
                email: email,
                _id: resetUser._id
            }

            const token = jwt.sign (payload, process.env.JWT_SECRET, {expiresIn: 600000})
           
            const link = `http://localhost:3000/reset-password/${resetUser._id}/${token}`

            let transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
                }
            });
            
            const message = {
                from: process.env.EMAIL_ADDRESS, // Sender address
                to: email ,         //  recipients
                subject: 'Reset FoodGram Login Password', // Subject line
                text: link // link to reset
            };
 
            transport.sendMail(message, function(err, info) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash('success_message', 'reset password link has been sent to your email')
                    res.render('login', {success_message: req.flash('success_message')})
                }
            })
            

        }

    },

    resetPassword: async (req,res) => {
      
        //let updateUserPass = UserModel.findById(id)
        //console.log(updateUserPass.password)
        const {id, token} = req.params

        const resetUser = await UserModel.findOne({_id : id})

        const resetToken = process.env.JWT_SECRET + resetUser.password

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            res.render('reset-password', {user_id : id})

        } catch(error) {
           console.log(error.message)
           res.send(error.message)
        }

    },

    submitResetPassword: async(req,res) => {
        
        const {id, password, password2} = req.body

        //creating an errors array to display all the errors
        let errors = []

        //Hash the password using bcrypt and saltrounds of 10
        const hash = bcrypt.hashSync(password, 10);

        //ensuring the user knows the password being keyed in
        if (password !== password2) {
            errors.push("Passwords don't match.")
        }

        let passUpdate = await UserModel.updateOne(
            { _id: id},

            {
                $set: {
                    password: hash,
                    updated_at: Date.now()
                }
            }

        )

        if (!passUpdate) {
            res.send ('failed')
        } else {
        req.flash('success_message', 'Password successfully updated')
        res.render('login', {success_message: req.flash('success_message')})
        }


    },  

 
    //log in to user dashboard
    dashboard: async (req, res) => {
                           
        //Getting all the recipes of the specific user
        let userRecipes = []
        userRecipes = await RecipeModel.find({user_id: req.user.user_id})


        res.render('dashboard', {user: req.user, userRecipes: userRecipes})

    },

    // Render the page for updating the user profile fields
    editDashboard: (req,res) => {
        res.render('editDashboard', {user: req.user})
    },

    //Update the user dashboard
    updateDashboard: async (req, res) => {
        
        await UserModel.updateOne (
            {user_id: req.user.user_id},

            {   
                $set:{
                    name: req.body.name,
                    website: req.body.website,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    pinterest: req.body.pinterest,
                    updated_date: Date.now()
                }
            }
        )
        
        res.redirect(`/user/${req.user.user_id}/dashboard/`)
    },

    // Render the page for updating the user photo
    editProfilePhoto: (req, res) => {
        res.render('editProfilePhoto', {user: req.user})
    },
    
    //Update the user dashboard
    updateProfilePhoto: async (req, res) => {

        let newUpload = null

        //upload the user image to cloudinary if there is one
        if(req.file) {
            
            if(req.user.cloudinary_id) {
                cloudinary.uploader.destroy(req.user.cloudinary_id)
            }

            newUpload = await streamUpload(req);

            await UserModel.updateOne (
                {user_id: req.user.user_id},
                {   
                    $set:{
                        image: newUpload.secure_url,
                        cloudinary_id: newUpload.public_id,
                    }
                }
            )   
        }

        res.redirect(`/user/${req.user.user_id}/dashboard/`)

    },


    //Edit Recipes
    updateRecipeForm: async (req, res) => {
        
        let userRecipe = []
    
        userRecipe = await RecipeModel.findById(req.params.id)
    
        res.render('updateRecipe', {recipe: userRecipe})

    },

    updateRecipe: async (req, res) => {
        let updatedIngredient = []
        
        for (let i = 0; i < req.body.ingredient.length; i++) {
            updatedIngredient.push({"item":req.body.ingredient[i]})
        }   
    
        let updatedInstructions = []
    
        for(let i =0; i< req.body.instruction.length; i++) {
            updatedInstructions.push({"toDo": req.body.instruction[i]})
        }
        
        //splitting the tags by comma and removing any whitespace before putting into the schema format
        let tagsArray = req.body.updateTags.split(',')
        let updatedTagsArray =  []

        for(let i =0; i< tagsArray.length; i++) {
            updatedTagsArray.push({"tag": tagsArray[i].trim()})
        }

        let newUpload
        
        if(req.file) {

            if(req.user.owner_cloud_id) {
                cloudinary.uploader.destroy(owner_cloud_id)
            }
    
            newUpload = await streamUpload(req);
            console.log('1: ' + newUpload)

            let updated = await RecipeModel.updateOne(
                { _id: req.params.id},
                {
                    $set: {
                        owner_image: newUpload.secure_url,
                        owner_cloud_id: newUpload.public_id,
                        updated_at: Date.now()
                    }
                }
            )

            console.log('2' + updated)
        }



        RecipeModel.updateOne(
            { _id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    prepared_by: req.body.prepared_by,
                    cuisine: req.body.cuisine,
                    serves: req.body.serves,
                    difficulty: req.body.difficulty,
                    time: req.body.time,
                    summary: req.body.summary,
                    ingredient: updatedIngredient,
                    website: req.body.website,
                    instagram: req.body.instagram,
                    facebook: req.body.facebook,
                    pinterest: req.body.pinterest,            
                    instruction: updatedInstructions,
                    tags: updatedTagsArray,
                    updated_at: Date.now()
                }
            }
        )

            .then(updatedRecipe => {
            
                res.redirect('/recipes/' + req.params.id)
                return
            })
         
    }
}
