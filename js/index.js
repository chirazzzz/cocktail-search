const searchInput = document.querySelector("#cocktail-input");
const cocktailSection = document.querySelector(".cocktails-section");
const cocktailList = document.querySelector("#cocktails-list");
const mainTitle = document.querySelector("#search-heading");
const cocktails = document.querySelectorAll('.cocktail');

// Navigation toggler
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

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

// Working function to create modals 
// function generateModal(data) {
//   const modal = `
//     <h3 class="text-dark fs-heading-card fw-bold cocktail-title">${data.strDrink}</h3>
//     <img src="${data.strDrinkThumb}" alt="${data.strDrink}" class="cocktail-img">
//     <h4 class="text-dark fw-bold cocktail-subtitle">Ingredients</h4>
//     <p class="text-dark>${data.strIngredient1}, ${data.strMeasure1}</p>
//     <p class="text-dark">${data.strIngredient2}, ${data.strMeasure2}</p>
//     <p class="text-dark">${data.strIngredient3}, ${data.strMeasure3}</p>
//     <h4 class="text-dark fw-bold cocktail-subtitle">Instructions</h4>
//     <p class="text-dark">${data.strInstructions}</p>
//   `
//   const newModal = document.createElement('div');
//   newModal.classList.add('modal')
//   newModal.id = 'modal'
//   newModal.innerHTML = modal;
//   cocktailSection.appendChild(newModal)

//   console.log(newModal)
// }

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

async function fetchCocktail(drink) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  const response = await fetch(URL);
  const json = await response.json();

  const cocktailArr = json.drinks;

  cocktailArr.forEach((element) => {
    generateRecipeCard(element);
  });

  // cocktailArr.forEach((element) => {
  //   generateModal(element);
  // });
}

searchInput.addEventListener("keyup", handleRecipeSearch);

// Failed attempt at getting modals working when clicking cocktails
// cocktails.forEach(cocktail => {
//   cocktail.addEventListener("click", () => {
//     const modal = document.querySelector('.modal')
//     modal.classList.remove('hidden')
//   })
// })