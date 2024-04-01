import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChartScreen from '../screens/ChartScreen';
import RecipesScreen from '../screens/RecipesScreen';
export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recipes">
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{title: 'Recipes'}}
          initialParams={{recipes: []}}
        />
        <Stack.Screen
          name="Chart"
          component={ChartScreen}
          options={{title: `Cuisine Chart`}}
          initialParams={{recipes: []}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
