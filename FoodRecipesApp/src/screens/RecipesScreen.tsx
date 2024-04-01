import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {fetchRecipes} from '../utils/mealdb-api';
import {Recipe} from '../utils/types';
import RecipesTable from '../components/RecipesTable';

export default function RecipesScreen({navigation}: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchRecipeData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchRecipeData();
  }, []);

  return (
    <View style={styles.container}>
      <RecipesTable recipes={recipes} />
      <View style={styles.button}>
        <Button
          color="#6a5acd"
          title="Go to Chart"
          onPress={() => {
            navigation.navigate('Chart', {recipes: recipes});
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  button: {
    backgroundColor: '#e6e6fa',
    marginVertical: 40,
    marginHorizontal: 100,
    borderRadius: 10,
  },
});
