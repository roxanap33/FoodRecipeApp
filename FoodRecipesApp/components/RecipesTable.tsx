import React, {useEffect, useState} from 'react';
import {Recipe, fetchRecipes} from '../mealdb-api';
import {Button, DataTable} from 'react-native-paper';
import ModalPopUp from './ModalPopUp';
import {StyleSheet, Text} from 'react-native';

interface TableProp {
  recipes: Recipe[];
}

export default function RecipesTable({recipes}: TableProp) {
  const [page, setPage] = useState<number>(0);
  const [selectedCellText, setSelectedCellText] = useState<string>('');
  const [selectedCellTitle, setSelectedCellTitle] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const itemsPerPage = 5;
  const startIndex = page * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, recipes.length);
  const paginatedRecipes = recipes.slice(startIndex, endIndex);

  //   const totalPages = Math.floor(recipes.length / itemsPerPage);
  //   const maxPages = 3;
  //   const startPage = Math.max(
  //     1,
  //     Math.min(page - Math.floor(maxPages / 2), totalPages - maxPages + 1),
  //   );
  //   const endPage = Math.min(startPage + maxPages - 1, totalPages);

  function handleNextPage() {
    setPage(prevPage => prevPage + 1);
  }

  function handlePrevPage() {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }

  function handlePageClick(pageNumber: number) {
    setPage(pageNumber);
  }

  function handleCellClick(text: string, title: string) {
    setSelectedCellText(text);
    setSelectedCellTitle(title);
    setIsModalVisible(true);
  }

  function handleModalClose() {
    setIsModalVisible(false);
  }

  return (
    <>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title textStyle={styles.column}>Name</DataTable.Title>
          <DataTable.Title textStyle={styles.column}>Area</DataTable.Title>
          <DataTable.Title textStyle={styles.column}>
            Instructions
          </DataTable.Title>
          <DataTable.Title textStyle={styles.column}>
            Ingredients
          </DataTable.Title>
        </DataTable.Header>

        {paginatedRecipes.map(recipe => (
          <DataTable.Row key={recipe.idMeal} style={styles.row}>
            <DataTable.Cell
              onPress={() => handleCellClick(recipe.strMeal, 'Name')}
              style={styles.cell}>
              <Text style={styles.cellText}>{recipe.strMeal}</Text>
            </DataTable.Cell>
            <DataTable.Cell>{recipe.strArea}</DataTable.Cell>
            <DataTable.Cell
              onPress={() =>
                handleCellClick(recipe.strInstructions, 'Instructions')
              }>
              {recipe.strInstructions}
            </DataTable.Cell>
            <DataTable.Cell
              onPress={() =>
                handleCellClick(recipe.strIngredients.join(', '), 'Ingredients')
              }>
              {recipe.strIngredients.join(', ')}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(recipes.length / itemsPerPage)}
          onPageChange={page => {
            setPage(page);
          }}
          label={`${startIndex + 1}-${endIndex} of ${recipes.length}`}
        />
      </DataTable>
      {/* <Button onPress={handlePrevPage} disabled={page === 1}>
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
      </Button> */}
      <ModalPopUp
        visible={isModalVisible}
        onClose={handleModalClose}
        text={selectedCellText}
        title={selectedCellTitle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    color: '#6a5acd',
    fontWeight: 'bold',
    fontSize: 14,
  },
  table: {
    backgroundColor: '#e6e6fa',
    marginTop: 20,
    borderRadius: 10,
  },
  row: {
    borderBottomColor: '#d8bfd8',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: '#d8bfd8',
  },
  cellText: {
    color: '#483d8b',
  },
  cell: {
    //flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
});
