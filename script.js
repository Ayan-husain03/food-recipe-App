
let search = document.querySelector(".search");
let form = document.querySelector(".searchBar");
let button = document.querySelector(".btn");
let container = document.querySelector(".recipeContainer");
let recipeContent = document.querySelector(".recipe-content");
let closeBtn = document.querySelector(".close-btn");


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

//function to get recipe 

const fetchRecipe = async (inputVal) => {
    container.innerHTML = `<div class="loader"></div>`;
    try {
        const data = await fetch(`${apiUrl}${inputVal}`)
        const response = await data.json();
        container.innerHTML = ``
        response.meals.forEach(meal => {
    
            const recipeDiv = document.createElement("div")
            recipeDiv.classList.add("card");
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="image" class="recipeImage">
            <h3 class="recipeName">${meal.strMeal}</h3>
            <p class="recipeArea">${meal.strArea} Dish</p>
            <p class="recipeCategory">Category : ${meal.strCategory}</p>
            `;
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
            // Adding Event on view recipe button
    
            button.addEventListener("click",()=>{
                showRecipe(meal)
            })
    
    
            container.appendChild(recipeDiv)
        });
    } catch (error) {
        alert("Error in fetching recipe")
    }

}

//function to fetch ingredients

const fetchIngredients = (meal)=>{
    console.log(meal);
    let ingredentList = "";
    for (let i = 1; i <=20; i++) {
        const ingredent = meal[`strIngredient${i}`]
        if (ingredent) {
            const measure = meal[`strMeasure${i}`]
            ingredentList += `<li>${measure} ${ingredent}</li>`
        }
        else{
            break
        }
    }
    return ingredentList;
    
}

// function to show recipe
const showRecipe = (meal) => {
    recipeContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div>
    <h3>Instruction</h3>
    <p>${meal.strInstructions}</p>
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `
    recipeContent.parentElement.style.display = "block"
}


function searchRecipe(e) {
    e.preventDefault();
    if (search.value != "") {
        const searchValue = search.value.trim()
        fetchRecipe(searchValue);
    } else {
        alert("Please enter something")
    }

    search.value = "";

}

button.addEventListener("click", searchRecipe);
closeBtn.addEventListener("click",()=>recipeContent.parentElement.style.display = "none")