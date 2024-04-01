import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {Recipe, TableProp} from '../utils/types';
import ModalPopUp from './ModalPopUp';

export default function RecipesTable({recipes}: TableProp) {
  const [page, setPage] = useState<number>(0);
  const [selectedCellText, setSelectedCellText] = useState<string>('');
  const [selectedCellTitle, setSelectedCellTitle] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const itemsPerPage = 8;
  const startIndex = page * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, recipes.length);
  const paginatedRecipes = recipes.slice(startIndex, endIndex);
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
        <DataTable.Header style={[styles.row, {alignItems: 'center'}]}>
          <View style={styles.titleContainer}>
            <DataTable.Title textStyle={styles.columnHeader}>
              Name
            </DataTable.Title>
          </View>
          <View style={styles.titleContainer}>
            <DataTable.Title textStyle={styles.columnHeader}>
              Cuisine
            </DataTable.Title>
          </View>
          <View style={styles.titleContainer}>
            <DataTable.Title textStyle={styles.columnHeader}>
              Instructions
            </DataTable.Title>
          </View>
          <DataTable.Title textStyle={[styles.columnHeader, {marginLeft: 5}]}>
            Ingredients
          </DataTable.Title>
        </DataTable.Header>

        {paginatedRecipes.map(recipe => (
          <DataTable.Row key={recipe.recipeId} style={styles.row}>
            <DataTable.Cell
              onPress={() => handleCellClick(recipe.recipeName, 'Name')}
              style={styles.cell}>
              <Text
                style={styles.cellText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {recipe.recipeName}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell
              onPress={() => handleCellClick(recipe.recipeCuisine, 'Cuisine')}
              style={styles.cell}>
              <Text
                style={styles.cellText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {recipe.recipeCuisine}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell
              style={styles.cell}
              onPress={() =>
                handleCellClick(recipe.recipeInstructions, 'Instructions')
              }>
              <Text
                style={styles.cellText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {recipe.recipeInstructions}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell
              onPress={() =>
                handleCellClick(
                  recipe.recipeIngredients.join(', '),
                  'Ingredients',
                )
              }>
              <Text
                style={styles.cellText}
                numberOfLines={2}
                ellipsizeMode="tail">
                {recipe.recipeIngredients.join(', ')}
              </Text>
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
  columnHeader: {
    textAlign: 'center',
    color: '#6a5acd',
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#d8bfd8',
  },
  table: {
    backgroundColor: '#e6e6fa',
  },
  row: {
    borderBottomColor: '#d8bfd8',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: '#d8bfd8',
  },
  cellText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  cell: {
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#d8bfd8',
  },
});
