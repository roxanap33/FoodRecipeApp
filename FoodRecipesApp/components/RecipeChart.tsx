import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Recipe, fetchRecipes} from '../mealdb-api';
import {PieChart} from 'react-native-chart-kit';

interface TableProp {
  recipes: Recipe[];
}
const RecipeChart = ({recipes}: TableProp) => {
  const calculateChartData = () => {
    const countryCount: {[key: string]: number} = {};
    const colors = [
      '#008080',
      '#FF5733',
      '#6A5ACD',
      '#32CD32',
      '#FFD700',
      '#800080',
      '#FF6347',
      '#4682B4',
      '#008000',
      '#FFFF00',
      '#800000',
      '#00FFFF',
      '#FF00FF',
      '#00FF00',
      '#000080',
    ];

    recipes.forEach(recipe => {
      const country = recipe.strArea;

      if (countryCount[country]) {
        countryCount[country]++;
      } else {
        countryCount[country] = 1;
      }
    });

    const chartData = Object.keys(countryCount).map((country, index) => ({
      name: country,
      count: countryCount[country],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      color: colors[index],
    }));

    console.log(chartData);

    return chartData;
  };

  const chartData = calculateChartData();

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View>
      <Text>Recipe Chart</Text>
      <PieChart
        data={chartData}
        width={350}
        height={300}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="35"
        hasLegend={false}
        absolute
      />
    </View>
  );
};

export default RecipeChart;
