const searchInput = document.querySelector("#cocktail-input");
const cocktailSection = document.querySelector(".cocktails-section");
const cocktailList = document.querySelector("#cocktails-list");
const mainTitle = document.querySelector("#search-heading");

/* 
<ul id="cocktails-list" class="cocktails-list main-grid">
  <li class="cocktail">
    <img
      src=""
      alt="cocktail name"
      class="cocktail-img"
    />
    <h3 class="text-dark fs-heading-card fw-bold cocktail-title">Cocktail name</h3>
  </li>
  
</ul>   */
// searchInput.style.display = "none";

function generateRecipeCard(data) {
  const card = `
    <img src="${data.strDrinkThumb}" alt="${data.strDrink}" class="cocktail-img">
    <h3 class="text-dark fs-heading-card fw-bold cocktail-title">${data.strDrink}</h3>
  `;
  const newLi = document.createElement("li");
  newLi.classList.add("cocktail");
  newLi.innerHTML = card;
  cocktailList.appendChild(newLi);
}

function handleRecipeSearch(e) {
  if (e.keyCode === 13 && e.target.value !== "") {
    const searchValue = e.target.value;
    fetchCocktail(searchValue);
    e.preventDefault();
    mainTitle.innerText = `${searchValue} Cocktails`;
    mainTitle.style.marginBottom = '0.3em';
    cocktailList.innerHTML = "";
  }
}

function handleInputChange() {}

async function fetchCocktail(drink) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  const response = await fetch(URL);
  const json = await response.json();

  console.log(json)

  const cocktailArr = json.drinks;

  cocktailArr.forEach((element) => {
    generateRecipeCard(element);
  });
}

searchInput.addEventListener("keyup", handleRecipeSearch);
