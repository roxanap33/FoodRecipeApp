import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Recipe, fetchRecipes} from '../mealdb-api';
import RecipeChart from '../components/RecipeChart';

export default function ChartScreen({route}: any) {
  const {recipes} = route.params;

  return (
    <View>
      <Text>Recipe Chart Screen</Text>
      <RecipeChart recipes={recipes} />
    </View>
  );
}
