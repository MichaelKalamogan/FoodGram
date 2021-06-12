window.onload = () =>{
    
    filterSelection('show all')

    let buttonArray = document.getElementsByClassName('index-filter-button')
    
    for(let i = 0; i < buttonArray.length; i++) {
        
        buttonArray[i].addEventListener("click", function () {
            let cuisine = buttonArray[i].innerHTML.toLowerCase()
            filterSelection(cuisine)
        })
    }
   

    function filterSelection (str) {
    
        let array1 = [];
        let array2 = document.getElementsByClassName('index-card');

        if(str ==='show all' ) {
            for(let i = 0; i< array2.length; i++) {
                array2[i].style.display= ''
            }
        } else {
            array1 = document.getElementsByClassName(str)
            for(let i = 0; i< array2.length; i++) {
                array2[i].style.display= 'none'
            }
    
            for(let i = 0; i< array1.length; i++) {
                array1[i].style.display= ''
            }    
        }

        

    }

}