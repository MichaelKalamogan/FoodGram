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
        res.render('new')
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
    }
}