import React, { useState, useEffect } from "react";

function Favorite() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = [];
    for (let index = 0; index < localStorage.length; index++) {
      const recipeName = localStorage.key(index);
      const recipeJSON = localStorage.getItem(recipeName);
      if (recipeJSON) {
        const recipe = JSON.parse(recipeJSON);
        recipes.push(recipe);
      }
    }
    setSavedRecipes(recipes);
  }, []);

  const removeRecipeFromLocalStorage = (recipeName) => {
    localStorage.removeItem(recipeName);
    setSavedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.name !== recipeName)
    );
  };

  return (
    <div className="big-container">
      <h1>My Favorite Recipes</h1>
      <button
        className="resetbutton"
        onClick={() => {
          localStorage.clear();
          setSavedRecipes([]);
        }}
      >
        Clear all recipes
      </button>
      {savedRecipes.length > 0 ? (
        <ul>
          {savedRecipes.map((recipe, index) => (
            <div id="container" key={index}>
              <div id="recipegeneral">
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt="not working" />
                <button
                  id="favorite"
                  onClick={() => {
                    removeRecipeFromLocalStorage(recipe.name);
                  }}
                >
                  Remove from favorite
                </button>
              </div>
              <div id="detailside">
                <ul>
                  <h3>Ingredients:</h3>
                  {recipe.ingredients.map((ingredient, ingredientIndex) => (
                    <li key={ingredientIndex}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <h4>Please add some recipes to the favorite</h4>
      )}
    </div>
  );
}

export default Favorite;
