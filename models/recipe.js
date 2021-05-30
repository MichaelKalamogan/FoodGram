const mongoose= require('mongoose')

const recipeSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    shared_by: { type: String, required: true},
    serves: { type: Number, required: true },
    time: { type: Number, required: true },
    difficulty: { type: String, required: true },
    summary: { type: String, required: true },
    ingredient: [{ 
        item: { type: String }, 
        quantity: {type: String}
    }],
    instruction: [{
        step: { type: Number },
        toDo: { type: String }
    }],

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

