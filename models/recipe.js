const mongoose= require('mongoose')

const recipeSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    prepared_by: { type: String },
    owner_image: { type: String },
    owner_cloud_id: { type: String },
    cuisine: { type: String, required: true },
    user_id: {type: String, required: true},
    serves: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: String, required: true },
    summary: { type: String},
    ingredient: [{item: {type: String}}],
    instruction: [{toDo : {type: String}}],
    tags: [{tag: {type: String}}],
    image: {type: String},
    cloudinary_id: {type: String},
    website: {type: String},
    facebook: {type: String},
    instagram: {type: String},
    pinterest: {type: String},
    reviews: [{
        rating: { type: Number },
        comment:{ type: String },
        user_id: { type: String },
        created: { type: Date, default: Date.now}
    }],
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}

}) //will need to add in the images portion

const RecipeModel = mongoose.model ('Recipe', recipeSchema)

module.exports = {
    RecipeModel : RecipeModel
}

