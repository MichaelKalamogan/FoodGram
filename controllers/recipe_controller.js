const { RecipeModel } = require ('../models/recipe')

module.exports = {

    index: async (req, res) => {
        let recipes = []

        try {
            recipes = await RecipeModel.find()

        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        res.render('index', {
            recipes: recipes,
        })
    },

    newForm: (req, res) => {
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
                res.render('show', { recipe : recipeReq })
            })
    },

    create: (req, res) => {

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
            user_id: 'Admin4',
            credit: req.body.credit,
            serves: req.body.serves,
            difficulty: req.body.difficulty,
            time: req.body.time,
            summary: req.body.summary,
            ingredient: newIngredient,            
            instruction: newInstructions
        })
            .then(createResp => {
                console.log(newModel.user_id)

            })
            .then(createResp =>{
                let newId = newModel._id
                let user = newModel.user_id
                
                res.redirect(`/recipes/${user}/${newId}`)
            })

    }
}