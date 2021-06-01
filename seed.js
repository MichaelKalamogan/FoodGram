const mongoose = require('mongoose')
const { RecipeModel } = require ('./models/recipe')

mongoose.set('useCreateIndex', true)
const mongoURI = 'mongodb://localhost:27017/Recipe'

let data = [

    {
        name: 'Nasi Goreng',
        cuisine: 'Asian',
        user_id: "Admin",
        credit: "lookie",
        serves: 1,
        time: 30,        
        difficulty: "easy",
        summary: "Fried rice Singaporean style. Topped with anchovies to give a full flavours",
        ingredient: [
            {item: "chilli padi", quantity: "14oz"},
            {item: "ikan bilis", quantity: "16oz"},
            {item: "milk", quantity: "10g"}
        ],

        instruction: [
            {step: 1, toDo: "pan Fry for 15 minutes"},
            {step: 2, toDo: 'stir fry for 16 minutes'},
            {step: 3, toDo: 'pour water and let it steam'}
        ],
        reviews: []
    },

    { 
        name: 'Inside Out Beef Cheeseburgers',
        cuisine: 'Western',
        user_id: "admin",
        credit: "https://eatineatout.ca/inside-out-beef-cheeseburgers/",
        serves: 1,
        time: 60,
        difficulty: "medium",
        summary: "Beef burgers are a great way to whip up a fast and totally delicious meal the whole family will love. There’s a big difference with these beef cheeseburgers, they’re inside out! All the yummy bacon and cheese is inside the patty, making it moist and totally irresistible",
        ingredient: [
            {item: "Lean Ground Beef", quantity: "500g"},
            {item: "Egg, lightly beaten", quantity: "1"},
            {item: "clove garlic, minced", quantity: "1"},
            {item: "shredded aged Cheddar cheese", quantity: "125ml"},
            {item: "diced bacon (uncooked)", quantity: "50ml"},
            {item: "bread crumbs and minced onion (each)", quantity: "50 mL"},
            {item: "Worcestershire sauce", quantity: "30ml"},
            {item: "minced fresh rosemary or tarragon", quantity: "2ml"},
        ],

        instruction: [
            {step: 1, toDo: "Combine beef, egg, garlic, cheese, bacon, bread crumbs, onion, Worcestershire sauce and rosemary in bowl."},
            {step: 2, toDo: 'Divide meat into 6 portions. Form into ¾ inch (2 cm) thick patties. Make thumb-print depression in centre of each patty (to prevent rounding while they grill). Make Ahead: Refrigerate, covered, for 1 hour or up to 1 day'},
            {step: 3, toDo: 'Grill over medium heat on preheated, oiled grill for 5 to 7 minutes per side, testing doneness with a digital instant read thermometer inserted sideways into centre of each patty to ensure patties are cooked to 160°F (71°C)'}
        ],
        reviews: []  
    }
]

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return RecipeModel.insertMany(data)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
      if (connection !== null) {
          connection.disconnect()
      }
  })
