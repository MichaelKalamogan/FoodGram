const bcrypt = require('bcryptjs')
const { UserModel } = require('../models/user')
const { RecipeModel } = require ('../models/recipe')

const passport = require('passport')
const recipe = require('../models/recipe')

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
                            res.redirect('/user/login')
                                
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
 
    //log in to user dashboard
    dashboard: async (req, res) => {
                           
        //Getting all the recipes of the specific user
        let userRecipes = []
        userRecipes = await RecipeModel.find({user_id: req.user.user_id})

        res.render('dashboard', {name: req.user.user_id, userRecipes: userRecipes})

    },

    editDashboard: (req,res) => {
        res.render('editDashboard', {user: req.user})

    },

    //Edit Recipes
    updateRecipeForm: async (req, res, next) => {
    
    let userRecipe = []
    
    userRecipe= await RecipeModel.findById(req.params.id)

        // .then(recipe => {
            res.render('updateRecipe', {recipe: userRecipe})
        // })
    },

    updateRecipe: async(req,res,next) => {

        let updatedIngredient = []
        
        for (let i = 0; i < req.body.ingredient.length; i++) {
            updatedIngredient.push({"item":req.body.ingredient[i]})
        }   
    
        let updatedInstructions = []
    
        for(let i =0; i< req.body.instruction.length; i++) {
            updatedInstructions.push({"toDo": req.body.instruction[i]})
        }         
        
        RecipeModel.updateOne(
            { _id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    cuisine: req.body.cuisine,
                    serves: req.body.serves,
                    difficulty: req.body.difficulty,
                    time: req.body.time,
                    summary: req.body.summary,
                    ingredient: updatedIngredient,            
                    instruction: updatedInstructions,
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