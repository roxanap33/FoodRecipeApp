import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Recipe, fetchRecipes} from '../mealdb-api';
import RecipeChart from '../components/RecipeChart';

export default function ChartScreen({route}: any) {
  const {recipes} = route.params;

  console.log('AICI', recipes.length);

  // const [recipes, setRecipes] = useState<Recipe[]>([]);

  // useEffect(() => {
  //   const fetchRecipesData = async () => {
  //     const data = await fetchRecipes();
  //     setRecipes(data);
  //     console.log('Data received:', data);
  //     return data;
  //     //calculateChartData();
  //   };

  //   fetchRecipesData();
  // }, []);

  // useEffect(() => {
  //   calculateChartData();
  //   console.log('INTRA');
  // }, [recipes]);

  // const calculateChartData = () => {
  //   const countryCount: {[key: string]: number} = {};
  //   const colors = [
  //     '#008080',
  //     '#FF5733',
  //     '#6A5ACD',
  //     '#32CD32',
  //     '#FFD700',
  //     '#800080',
  //     '#FF6347',
  //     '#4682B4',
  //     '#008000',
  //     '#FFFF00',
  //     '#800000',
  //     '#00FFFF',
  //     '#FF00FF',
  //     '#00FF00',
  //     '#000080',
  //   ];

  //   recipes.forEach(recipe => {
  //     const country = recipe.strArea;

  //
  //     if (countryCount[country]) {
  //       countryCount[country]++;
  //     } else {
  //       countryCount[country] = 1;
  //     }
  //   });

  //
  //   const chartData = Object.keys(countryCount).map((country, index) => ({
  //     country,
  //     count: countryCount[country],
  //     color: colors[index % colors.length],
  //   }));

  //   console.log(chartData);

  //   return chartData;
  // };

  return (
    <View>
      <Text>Recipe Chart Screen</Text>
      <RecipeChart recipes={recipes} />
    </View>
  );
}
