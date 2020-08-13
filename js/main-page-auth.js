const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const recipeList = Array.from(document.querySelectorAll('.button'));
const buttonStarList = Array.from(document.querySelectorAll('.button-star'));
const menuCounter = document.querySelector('.menu__counter');
let counter = 0;

// Добавляет рецепт в покупки
function addRecipeHandler() {
  const recipeId = event.target.getAttribute('data-recipe-id');
  const iconElement = event.target;

  api.addRecipe(recipeId).then(() => {
    iconElement.classList.remove('button_color_grey');
    iconElement.classList.add('button_type_tick', 'button_color_white');
    iconElement.textContent = 'Рецепт добавлен';

    menuCounter.classList.add('menu__counter_enabled');
    menuCounter.textContent = `${++counter}`;

    iconElement.removeEventListener('click', addRecipeHandler);
    iconElement.addEventListener('click', removeRecipeHandler);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет рецепт из покупок
function removeRecipeHandler() {
  const recipeId = event.target.getAttribute('data-recipe-id');
  const iconElement = event.target;

  api.removeRecipe(recipeId).then(() => {
    iconElement.classList.remove('button_type_tick', 'button_color_white');
    iconElement.classList.add('button_color_grey');
    iconElement.textContent = 'Добавить в покупки';

    menuCounter.textContent = `${--counter}`;
      if (counter === 0) {
        menuCounter.classList.remove('menu__counter_enabled');
      }

    iconElement.removeEventListener('click', removeRecipeHandler);
    iconElement.addEventListener('click', addRecipeHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет в избранное
function addFavouritesHandler() {
  const favouritesIdId = event.target.getAttribute('data-id');
  const iconElement = event.target;

  api.addFavourites(favouritesIdId).then(() => {
    iconElement.classList.remove('button-star_inactived');
    iconElement.classList.add('button-star_actived');

    iconElement.removeEventListener('click', addFavouritesHandler);
    iconElement.addEventListener('click', removeFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет из избранного
function removeFavouritesHandler() {
  const favouritesId = event.target.getAttribute('data-id');
  const iconElement = event.target;

  api.removeFavourites(favouritesId).then(() => {
    iconElement.classList.remove('button-star_actived');
    iconElement.classList.add('button-star_inactived');

    iconElement.removeEventListener('click', removeFavouritesHandler);
    iconElement.addEventListener('click', addFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет слушатель на все кнопки
function setEventListeners(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setEventListeners(recipeList, 'click', addRecipeHandler);
setEventListeners(buttonStarList, 'click', addFavouritesHandler);