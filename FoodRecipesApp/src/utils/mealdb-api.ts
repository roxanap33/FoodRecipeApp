import axios from 'axios';
import {Recipe} from './types';

export const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    const meals = response.data.meals || [];
    const recipes: Recipe[] = meals.map((meal: any) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        if (ingredient) {
          ingredients.push(ingredient);
        } else {
          break;
        }
      }
      return {
        recipeId: meal.idMeal,
        recipeName: meal.strMeal,
        recipeCuisine: meal.strArea,
        recipeInstructions: meal.strInstructions,
        recipeIngredients: ingredients,
      };
    });
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes: ', error);
    return [];
  }
};
