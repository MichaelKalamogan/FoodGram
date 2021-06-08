const { RecipeModel } = require ('../models/recipe')
const { UserModel } = require('../models/user')
const cloudinary = require('../config/cloudinary-config')

module.exports = {

    index: async (req, res, next) => {
        let recipes = []

        recipes = await RecipeModel.find()

        if(!req.user) {
            await req.flash('suggestion', 'Log In to upload your own recipe, give ratings and receive comments on your own recipes! ')
            res.render('index', { recipes: recipes })
        } else {

            res.render('index', { recipes: recipes })
        }
        
    },

    new: (req, res) => {
        res.render('newform')
    },

    show: async(req, res) => {

        let recipeReq = {}
       
        let item = await RecipeModel.findOne ({_id: req.params.id})

        if (!item) {
            res.send('Not Found')
            return
        } else {

            recipeReq = item
        }
       
        let userReq = await UserModel.findOne({user_id: recipeReq.user_id})
            if(userReq) {
                res.render('show', { recipe : recipeReq ,userReq: userReq} )
            } else {
                res.render('show', { recipe : recipeReq } )
            }
            
    },

    create: async (req, res) => {

        const { name, newImage, cuisine, serves, difficulty, time, summary, ingredient, instructions} = req.body

        //creating an errors array to display all the errors
        let errors = []

        //ensuring all fields are filled up
        if(!name|| !cuisine || !serves || !difficulty || !time || !summary) {
            errors.push('All fields are required to be filled up.')
        }

        //showing the users the errors that preventing the registration from beign submitted
        if (errors.length > 0) {

            //re-render the registration site but keep the details in the form less password
            res.render('newform', {
                errors: errors,
                name: name,
                image: newImage,
                cuisine: cuisine,
                serves: serves,
                difficulty: difficulty,
                time: time,
                summary: summary,
                ingredient: ingredient,            
                instruction: instructions
            })

        } else {

            let newIngredient = []
        
            for (let i = 0; i < req.body.ingredient.length; i++) {
                newIngredient.push({"item":req.body.ingredient[i]})
            }   
        
            let newInstructions = []
        
            for(let i =0; i< req.body.instruction.length; i++) {
                newInstructions.push({"toDo": req.body.instruction[i]})
            }

            let newUpload = await cloudinary.uploader.upload(req.file.path);

            RecipeModel.create({

                name: name,
                image: newUpload.secure_url,
                cloudinary_id: newUpload.public_id,
                cuisine: cuisine,
                user_id: req.user.user_id,
                serves: serves,
                difficulty: difficulty,
                time: time,
                summary: summary,
                ingredient: newIngredient,            
                instruction: newInstructions
            })
                .then(createResp =>{        
                    res.redirect(`/user/${req.user.user_id}/dashboard`)
                })
        }
    },

    delete: async (req, res) => {
        
        let deleteRecipe = await RecipeModel.findOne({_id: req.params.id})
        if (deleteRecipe.user_id === req.user.user_id) {
            await RecipeModel.deleteOne( {_id: req.params.id})
            await cloudinary.uploader.destroy(deleteRecipe.cloudinary_id)
        }
    
        res.redirect(`/user/${req.user.user_id}/dashboard`)
    
    }

}