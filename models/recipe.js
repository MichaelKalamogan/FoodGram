const mongoose= require('mongoose')

const recipeSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    user_id: {type: String, required: true},
    credit: { type: String, required: true},
    serves: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: String, required: true },
    summary: { type: String, required: true },
    ingredient: [{item: {type: String}}],
    instruction: [{toDo : {type: String}}],

    reviews: [{
        rating: { type: Number },
        comment:{ type: String }
    }],
    created_at: { type: Date },
    updated_at: { type: Date },

}) //will need to add in the images portion

const RecipeModel = mongoose.model ('Recipe', recipeSchema)

module.exports = {
    RecipeModel : RecipeModel
}

