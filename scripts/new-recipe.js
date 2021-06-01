window.onload = () => {
    
    let ingredientList = document.getElementById('ingredient-list')
    
    //buttons in new.ejs
    let addIngredientButton = document.getElementById('add-ingredient')
    let delIngredientButton = document.getElementById('del-ingredient')
    let addCookingStepsButton = document.getElementById('add-steps')
    let delCookingStepsButton =  document.getElementById('delete-steps')


   

    //When the user clicks the add button, a new input box shoule be created
    addIngredientButton.onclick = (event) => {

        event.preventDefault();
        
        //create the new div for ingredient.item
        let newIngredientItemDiv = document.createElement('div')
        newIngredientItemDiv.setAttribute('class', 'col-md-6')
        
        //create the new input field for ingredient.item
        let newIngredientItem = document.createElement('input')
        newIngredientItem.setAttribute('type', 'text')
        newIngredientItem.setAttribute('class', 'form-control ingredient-item')
        newIngredientItem.setAttribute('name','item')
        
        //Append item input field to div
        newIngredientItemDiv.appendChild(newIngredientItem);

        //create the new div for ingredient.qty
        let newIngredientQtyDiv = document.createElement('div')
        newIngredientQtyDiv.setAttribute('class', 'col-md-2')

        //create the new input field for ingredient.item
        let newIngredientQty = document.createElement('input')
        newIngredientQty.setAttribute('type', 'text')
        newIngredientQty.setAttribute('class', 'form-control ingredient-qty')
        newIngredientQty.setAttribute('name','amount')

        //Append quantity input field to div
        newIngredientQtyDiv.appendChild(newIngredientQty)
        
        //append new Ingredient item div to section
        ingredientList.appendChild(newIngredientItemDiv)

        //append new Ingredient quantity div to section
        ingredientList.appendChild(newIngredientQtyDiv)
    }

    addCookingStepsButton.onclick = (event) => {

        event.preventDefault();

         //table variables
        let table = document.getElementById('prep-steps')
        let rowCount = table.rows.length

        //creating new row 
        let newRow = document.createElement('tr')
        let newColumn = document.createElement('td')
        let newInputCol = document.createElement('td')
        let newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('name','toDo')

        //appending input field to column
        newInputCol.appendChild(newInput)

        //creating number field for first column
        newColumn.innerHTML = rowCount + 1

        //appending columns to row
        newRow.appendChild(newColumn)
        newRow.appendChild(newInputCol)

        //append new row to table
        table.append(newRow)    

    }


  delIngredientButton.onclick = (event) => {

        event.preventDefault();

        ingredientList.removeChild(ingredientList.lastElementChild)
        ingredientList.removeChild(ingredientList.lastElementChild)

    }


    delCookingStepsButton.onclick = (event) => {

        event.preventDefault();
        
        //table variables
        let table = document.getElementById('prep-steps')
        let rowCount = table.rows.length

        if (rowCount > 1) {

            let lastRow = table.lastElementChild
            table.removeChild(lastRow)

        } else if (rowCount === 1) {

            alert('Require at least one step')
        }
       
    }


}