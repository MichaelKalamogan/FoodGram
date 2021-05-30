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
}