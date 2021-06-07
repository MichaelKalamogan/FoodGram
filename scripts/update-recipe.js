
window.onload = () => {

    let ingredientList = document.getElementById('updateIngredient')
    let instructionList = document.getElementById('updateInstruction')

    //buttons in updateRecipe.ejs
    let addIngredientButton = document.getElementById('ingAdd')
    let delIngredientButton = document.getElementById('ingDel')
    let addCookingStepsButton = document.getElementById('instAdd')
    let delCookingStepsButton =  document.getElementById('instDel')

    //When the user clicks the add button, a new input box should be created
    addIngredientButton.onclick = (event) => {

        event.preventDefault();

        let newInputField = document.createElement('input')
        newInputField.setAttribute('class', 'form-control mb-2')
        newInputField.setAttribute('type', 'text')
        newInputField.setAttribute('name', 'ingredient[]')
        
        //Append item input field to div
        ingredientList.appendChild(newInputField);
    }

    //Adding new input box for instructions
    addCookingStepsButton.onclick = (event) => {

        event.preventDefault();

        let newInputField = document.createElement('input')
        newInputField.setAttribute('class', 'form-control mb-2')
        newInputField.setAttribute('type', 'text')
        newInputField.setAttribute('name', 'instruction[]')
        
        //Append item input field to div
        instructionList.appendChild(newInputField);
    }

    delIngredientButton.onclick = (event) => {
        event.preventDefault();

        if(ingredientList.childElementCount > 1) {
            ingredientList.removeChild(ingredientList.lastElementChild)
        } else {
            alert("Need at least one ingredient")
            return
        }
    }

    delCookingStepsButton.onclick = (event) => {
        event.preventDefault();

        if(instructionList.childElementCount > 1) {
        instructionList.removeChild(instructionList.lastElementChild)
        } else {
            alert("Need at least one cookign instruction")
            return
        }
    }   


}