import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
  const totalCount = chartData.reduce(
    (total, country) => total + country.count,
    0,
  );
  const chartDataWithPercentage = chartData.map(chartDataItem => ({
    ...chartDataItem,
    percentage: ((chartDataItem.count / totalCount) * 100).toFixed(1) + '%',
  }));

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
      <PieChart
        data={chartData}
        width={350}
        height={350}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="95"
        hasLegend={false}
        absolute
      />
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        {chartDataWithPercentage.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.color, {backgroundColor: item.color}]} />
            <Text style={styles.text}>
              {item.name} {item.percentage}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecipeChart;

const styles = StyleSheet.create({
  legendContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  color: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    marginLeft: 8,
  },
});
