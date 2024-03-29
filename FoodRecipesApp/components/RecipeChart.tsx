import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Recipe, fetchRecipes} from '../mealdb-api';
import PieChart from 'react-native-pie-chart';

interface ChartDataItem {
  count: number;
  country: string;
  color?: string;
}

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
      country,
      count: countryCount[country],
      color: colors[index % colors.length],
    }));

    console.log(chartData);

    return chartData;
  };

  const chartData = calculateChartData();
  const series = chartData.map(item => item.count);
  console.log('SERIES', series);

  const sliceColor = chartData.map(item => item.color || '#008080');

  return (
    <View>
      <Text>Recipe Chart</Text>
      <PieChart
        widthAndHeight={300}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.45}
      />
    </View>
  );
};

export default RecipeChart;
