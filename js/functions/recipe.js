const menuCounter = document.querySelector('.menu__counter');

// Добавляет рецепт в покупки
function addRecipeHandler(event) {
  const iconElement = event.target;
  const recipeId = iconElement.getAttribute('data-recipe-id');

  api.addRecipe(recipeId).then((item) => {
    iconElement.classList.remove('button_color_grey');
    iconElement.classList.add('button_type_tick', 'button_color_white');
    iconElement.textContent = 'Рецепт добавлен';

    menuCounter.classList.add('menu__counter_enabled');
    menuCounter.textContent = item.purchases.length;

    iconElement.removeEventListener('click', addRecipeHandler);
    iconElement.addEventListener('click', removeRecipeHandler);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет рецепт из покупок
function removeRecipeHandler(event) {
  const iconElement = event.target;
  const recipeId = iconElement.getAttribute('data-recipe-id');

  api.removeRecipe(recipeId).then((item) => {
    iconElement.classList.remove('button_type_tick', 'button_color_white');
    iconElement.classList.add('button_color_grey');
    iconElement.textContent = 'Добавить в покупки';

    menuCounter.textContent = item.purchases.length;
      if (item.purchases.length === 0) {
        menuCounter.classList.remove('menu__counter_enabled');
      }

    iconElement.removeEventListener('click', removeRecipeHandler);
    iconElement.addEventListener('click', addRecipeHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}