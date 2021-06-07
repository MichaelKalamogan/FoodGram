// JS script file for newform.ejs

window.onload = () => {
    
    let ingredientList = document.getElementById('ingredientList')
    let instructionList = document.getElementById('instructionList')
    
    //buttons in newform.ejs
    let addIngredientButton = document.getElementById('add-ingredient')
    let delIngredientButton = document.getElementById('del-ingredient')
    let addCookingStepsButton = document.getElementById('add-steps')
    let delCookingStepsButton =  document.getElementById('delete-steps')

    //When the user clicks the add button, a new input box should be created
    let ingredientRow = 1 
    addIngredientButton.onclick = (event) => {

        event.preventDefault();
        
        //create the new input for ingredient.item
        let newIngredientItemInput = document.createElement('input')
        newIngredientItemInput.setAttribute('type', 'text')
        newIngredientItemInput.setAttribute('class','form-control mb-2')
        newIngredientItemInput.setAttribute('name','ingredient[]')
        
        //Append item input field to div
        ingredientList.appendChild(newIngredientItemInput);

        //add to the ingredient row variable
        ingredientRow++;
    }

    //When the user clicks the add steps button, a new input box should be created
    let cookingStep = 1
    
    addCookingStepsButton.onclick = (event) => {
        
        event.preventDefault();

        //create new step div (number)
        let newInstructionInput = document.createElement('input')
        newInstructionInput.setAttribute('type', 'text')
        newInstructionInput.setAttribute('class','form-control mb-2')
        newInstructionInput.setAttribute('name','instruction[]')

        //append newinput field
        instructionList.appendChild(newInstructionInput)

        //to cooking step variable to keep track of step no.    
        cookingStep++;
    }


  delIngredientButton.onclick = (event) => {

        event.preventDefault();

        if (ingredientRow > 1) {

            ingredientRow--;
            //remove ingredient and quantity
            ingredientList.removeChild(ingredientList.lastElementChild)

        } else { 

            alert("Need at least one ingredient")
            return
        }
    }


    delCookingStepsButton.onclick = (event) => {

        if (cookingStep > 1) {

            cookingStep--;

            //remove input 
            instructionList.removeChild(instructionList.lastElementChild)

        } else {

            alert("nothing to delete")
            return
        }

    }


}