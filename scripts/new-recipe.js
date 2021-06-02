// JS script file for newform.ejs

window.onload = () => {
    
    let ingredientList = document.getElementById('ingredient-list')
    let preparationList = document.getElementById('preparation')
    
    //buttons in new.ejs
    let addIngredientButton = document.getElementById('add-ingredient')
    let delIngredientButton = document.getElementById('del-ingredient')
    let addCookingStepsButton = document.getElementById('add-steps')
    let delCookingStepsButton =  document.getElementById('delete-steps')

    //When the user clicks the add button, a new input box should be created
    let ingredientRow = 1 
    addIngredientButton.onclick = (event) => {

        event.preventDefault();
        
        //create the new div for ingredient.item
        let newIngredientItemDiv = document.createElement('div')
        newIngredientItemDiv.setAttribute('class', 'col-md-6')
        
        //create the new input field for ingredient.item
        let newIngredientItem = document.createElement('input')
        newIngredientItem.setAttribute('type', 'text')
        newIngredientItem.setAttribute('class', 'col-md-6 form-control ingredient-item')
        newIngredientItem.setAttribute('name','ingredient[]')
        newIngredientItem.setAttribute('placeholder', 'Next Ingredient')
        //Append item input field to div
        newIngredientItemDiv.appendChild(newIngredientItem);

        //create the new div for ingredient.qty
        // let newIngredientQtyDiv = document.createElement('div')
        // newIngredientQtyDiv.setAttribute('class', 'col-md-2')

        //create the new input field for ingredient.item
        // let newIngredientQty = document.createElement('input')
        // newIngredientQty.setAttribute('type', 'text')
        // newIngredientQty.setAttribute('class', 'col-md-2 form-control ingredient-qty')
        // newIngredientQty.setAttribute('name','ingredientQuantity[]')
        // newIngredientQty.setAttribute('placeholder','Quantity')

        //Append quantity input field to div
        // newIngredientQtyDiv.appendChild(newIngredientQty)
        
        //append new Ingredient item div to section
        ingredientList.appendChild(newIngredientItemDiv)

        //append new Ingredient quantity div to section
        // ingredientList.appendChild(newIngredientQtyDiv)

        //add to the ingredient row variable
        ingredientRow++;
    }

    //When the user clicks the add steps button, a new input box should be created
    let cookingStep = 1
    
    addCookingStepsButton.onclick = (event) => {
        
        event.preventDefault();

        //to cooking step variable to keep track of step no.    
        cookingStep++;

        //create new step div (number)
        let newStepDiv = document.createElement('div')
        let newh4 = document.createElement('h4')
        newh4.setAttribute('class', 'step')      
        newh4.innerText = cookingStep + '.'

        //append h4 to steps div
        newStepDiv.appendChild(newh4)

        //create new steps input div
        let newStepInputDiv = document.createElement('div')
        newStepInputDiv.setAttribute('class', 'col-md-7')

        //create steps input
        let newStepInput = document.createElement('input')
        newStepInput.setAttribute('type', 'text')
        newStepInput.setAttribute('class', 'col-md-7 form-control')
        newStepInput.setAttribute('name', 'instruction[]')
        newStepInput.setAttribute('placeholder', 'Next Step to Take')

        //append steps input to dteps div
        newStepInputDiv.appendChild(newStepInput)

        //append to html
        preparationList.appendChild(newStepDiv)
        preparationList.appendChild(newStepInputDiv)

    }


  delIngredientButton.onclick = (event) => {

        event.preventDefault();

        //remove ingredient and quantity
        ingredientList.removeChild(ingredientList.lastElementChild)
        ingredientList.removeChild(ingredientList.lastElementChild)

        if (ingredientRow > 0) {
            ingredientRow--;
        }
    }


    delCookingStepsButton.onclick = (event) => {

        if (cookingStep > 1) {
            cookingStep--;

        //remove input and step number
        preparationList.removeChild(preparationList.lastElementChild)
        preparationList.removeChild(preparationList.lastElementChild)

        } else {
            alert("nothing to delete")
            return
        }

    }


}