import React from 'react';
import {Text, View} from 'react-native';
import RecipesTable from '../components/RecipesTable';

export default function RecipesScreen() {
  console.log('RECIPES');
  return (
    <View>
      <RecipesTable />
    </View>
  );
}
