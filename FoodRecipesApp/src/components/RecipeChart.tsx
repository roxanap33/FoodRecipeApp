import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {TableProp} from '../utils/types';

export default function RecipeChart({recipes}: TableProp) {
  const calculateChartData = () => {
    const countryCount: {[key: string]: number} = {};
    const colors = [
      '#b198f4',
      '#c95bf0',
      '#3c5de3',
      '#2c2aae',
      '#36a4db',
      '#8a018a',
      '#FF6347',
      '#7db8e9',
      '#3eec3e',
      '#eeee45',
      '#800000',
      '#00FFFF',
      '#FF00FF',
      '#eb98b4',
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
      </View>
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
}

const styles = StyleSheet.create({
  legendContainer: {
    marginLeft: 20,
    marginBottom: 150,
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
