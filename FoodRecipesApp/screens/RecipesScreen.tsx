import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import RecipesTable from '../components/RecipesTable';
import {Recipe, fetchRecipes} from '../mealdb-api';
import {StackNavigationProp} from '@react-navigation/stack';

export default function RecipesScreen({navigation}: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchRecipeData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchRecipeData();
  }, []);
  console.log('RECIPES');
  return (
    <View style={styles.container}>
      <RecipesTable recipes={recipes} />
      <Button
        title="Chart"
        onPress={() => {
          navigation.navigate('Chart', {recipes: recipes});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
