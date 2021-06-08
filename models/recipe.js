const mongoose= require('mongoose')

const recipeSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    user_id: {type: String, required: true},
    serves: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: String, required: true },
    summary: { type: String},
    ingredient: [{item: {type: String}}],
    instruction: [{toDo : {type: String}}],
    image: {type: String},
    cloudinary_id: {type: String},
    reviews: [{
        rating: { type: Number },
        comment:{ type: String }
    }],
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}

}) //will need to add in the images portion

const RecipeModel = mongoose.model ('Recipe', recipeSchema)

module.exports = {
    RecipeModel : RecipeModel
}

