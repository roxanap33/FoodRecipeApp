import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RecipesTable from '../components/RecipesTable';

export default function RecipesScreen() {
  console.log('RECIPES');
  return (
    <View style={styles.container}>
      <RecipesTable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
