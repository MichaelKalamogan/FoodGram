const { RecipeModel } = require ('../models/recipe')

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
        
        RecipeModel.findOne ({user_id:  req.params.user_id, _id: req.params.id})
            .then(item => {
                // if item is not found, redirect to homepage
                if (!item) {
                    res.send('Not Found')
                    return
                }

                recipeReq = item
            })
            .then(recipe => {
                res.render('show', { recipe : recipeReq/*,user: user*/} )
            })
    },

    create: (req, res) => {

        const { name, cuisine, credit, serves, difficulty, time, summary, ingredient, instructions} = req.body

        //creating an errors array to display all the errors
        let errors = []

        //ensuring all fields are filled up
        if(!name||  !cuisine || !serves || !difficulty || !time || !summary) {
            errors.push('All fields are required to be filled up.')
        }

        //showing the users the errors that preventing the registration from beign submitted
        if (errors.length > 0) {

            //re-render the registration site but keep the details in the form less password
            res.render('newform', {
                errors: errors,
                name: name,
                cuisine: cuisine,
                credit: credit,
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
        

            RecipeModel.create({

                name: req.body.name,
                cuisine: req.body.cuisine,
                user_id: req.user.user_id,
                credit: req.body.credit,
                serves: req.body.serves,
                difficulty: req.body.difficulty,
                time: req.body.time,
                summary: req.body.summary,
                ingredient: newIngredient,            
                instruction: newInstructions
            })
                .then(createResp =>{        
                    res.redirect(`/user/dashboard`)
                })
        }
    },

}