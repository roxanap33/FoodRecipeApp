import {View, Text, StyleSheet} from 'react-native';
import RecipeChart from '../components/RecipeChart';

export default function ChartScreen({route}: any) {
  const {recipes} = route.params;

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Recipe Chart Screen</Text>
      <RecipeChart recipes={recipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
