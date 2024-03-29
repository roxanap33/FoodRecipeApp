import React, {useEffect, useState} from 'react';
import {Recipe, fetchRecipes} from '../mealdb-api';
import {Button, DataTable} from 'react-native-paper';

export default function RecipesTable() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchRecipeData();
  }, []);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const maxPages = 3;
  const startPage = Math.max(
    1,
    Math.min(page - Math.floor(maxPages / 2), totalPages - maxPages + 1),
  );
  const endPage = Math.min(startPage + maxPages - 1, totalPages);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedRecipes = recipes.slice(startIndex, endIndex);

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Area</DataTable.Title>
          <DataTable.Title>Instructions</DataTable.Title>
          <DataTable.Title>Ingredients</DataTable.Title>
        </DataTable.Header>

        {paginatedRecipes.map(recipe => (
          <DataTable.Row key={recipe.idMeal}>
            <DataTable.Cell>{recipe.strMeal}</DataTable.Cell>
            <DataTable.Cell>{recipe.strArea}</DataTable.Cell>
            <DataTable.Cell>{recipe.strInstructions}</DataTable.Cell>
            <DataTable.Cell>{recipe.strIngredients.join(', ')}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Button onPress={handlePrevPage} disabled={page === 1}>
        Prev
      </Button>
      {Array.from({length: endPage - startPage + 1}, (_, index) => (
        <Button
          key={startPage + index}
          onPress={() => handlePageClick(startPage + index)}
          style={{
            backgroundColor: startPage + index === page ? 'yellow' : 'white',
          }}>
          {startPage + index}
        </Button>
      ))}
      <Button onPress={handleNextPage} disabled={page === totalPages}>
        Next
      </Button>
    </>
  );
}
