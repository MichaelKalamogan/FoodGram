# FoodGramltd

The intent of the site is for people, who have run out of ideas on what to cook, to draw inspiration from some of the recipes.
* Based on the difficulty and the number of pax it serves, they can just choose after filtering according to the cuisine they prefer.
* As more reviews are provided, it also provides an avenue for good homecooks to showcase their talents.

* Built as part of a project for my software engineering course.
* Can be accessed at the following url:  https://foodgramltd.herokuapp.com/recipes/home

![Image of homepage](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/Homepage.png)
    
## App Features
* Registered users are able to log in and upload their homemade recipes.
    * These recipes can be reviwed by other registered users
    * The final intent is to showcase really good recipes as well as the person who created it. Provides a platform for homecooks to showcase their talent.

* All visitors to the site will be able to view all the recipes. Clicking on a specific recipe will show the full details of the recipe, the reviews and the details of the person who posted it.

    ![Image of fullrecipe](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/showfullrecipe.png)

* Can filter them according to cuisine and tags.  

    ![Image of filter](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/filter.png)

* However, non-registered users will not be able to submit a review or upload their own recipes.

    ![Image of loginalert](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/login.png)



## Frameworks/middleware/tools used
* Javascript
* html
* CSS
* Node.js
* express
* passport
* multer
* jsonwebtoken
* streamify
* bootstrap

## How the app was built

#### Layout of website
* Bootstap frameworks were used to complement my css.
* The website was made to be mobile friendly by having a separate segment "@media screen" in the css.

#### Backend Database
The app uses a noSql database, MongoDB. 

#### Data Inputs and Updates
Mongoose is used to manage the data between MongodDB and Node.js.
* Three main schemas were created. 
    *   User, recipe and ratings. All had a common key value: user_id.

#### Files and Directores
* File to run the app is in the parent folder and is called server.js

* The two controllers for the various routes are in the controllers folder
    * recipe_ controller.js and user_controller.js

* The actual pages to be rendered are in the views folder and in ejs format.
    * There are four partials that have been created to be applied in all the pages
        * head.ejs (which has all the common starting html syntax)
        * nav.ejs (the navigation bar for all the pages)

        ![Image of Navigation Bar](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/navigation.png)

        * footer.ejs (to be applied at the base of every page)

        ![Image of Footer](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/footer.png)

        * alerts.ejs (for req.flash messages)

        ![Image of an Alert](https://github.com/MichaelKalamogan/foodgramltd/blob/main/public/Images/alert.png)

* There are three scripts in the scripts folder
    * index-filter.js (for index.ejs) does the filtering of the various recipes to display as requested by the user 
    * new-recipe.js (for newform.ejs) does the adding and deletion of rows when users are uploading their new recipe
    * update-recipe.js (for updateRecipe.ejs) does the adding and deletion of rows when users are updating their recipe

* The css is in the public folder. It is accessed by server.js - "app.use(express.static(__dirname + '/public'))"

* The two schema models are in the models folder

* The authentication middleware to verify if users are authenticated before accessing certain pages is in the middlewares folder.

* The config files for cloudinary. passport and multer are in the config folder.

###### Contact-US
* nodemailer was used for the contact page. Sends a mail to foodgramltd@gmail.com with the comment/message

#### Authentication
Authentication is done by using localstrategy of Passport authentication middleware : http://www.passportjs.org/packages/passport-local/

* Jsonwebtoken was used for resetting of password. Sends a mail to the user with a unique link valid for 10 minutes.

#### Uploading of files
Images are uploaded to cloudinary using multer and streamify, so as to minimise any local disk storage: https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
* A cloudinary id was included in user and recipe schemas to faciliate the deletion of previous images whenever there is an update to the image or the recipe is deleted.

# Suggestions and Improvements
Will appreciate any suggestions and improvements to the code, layout, user interface or even the basic idea itself. Thank you. 

# Credits

https://www.canva.com/ - The main banner for the homepage

To start the site, recipes were taken from the following sites:
* https://www.bbcgoodfood.com/recipes/singapore-noodles-prawns
* https://www.bbcgoodfood.com/recipes/stir-fried-beef-oyster-sauce
* https://www.bbcgoodfood.com/recipes/sea-bass-sizzled-ginger-chilli-spring-onions
* https://www.bbcgoodfood.com/recipes/crisp-chinese-pork
* https://www.bbcgoodfood.com/recipes/ginger-sweet-tofu-pak-choi
* https://www.recipetineats.com/nagi-recipetin-eats/
* https://www.feastingathome.com/chilaquiles
* https://www.feastingathome.com/nachos-recipe/
* https://www.feastingathome.com/corn-fritters-with-cilantro-cream/
* https://www.feastingathome.com/hibiscus-flower-quesadillas/


