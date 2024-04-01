import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Recipe, fetchRecipes} from './utils/mealdb-api';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RecipesScreen from './screens/RecipesScreen';
import ChartScreen from './screens/ChartScreen';
import AppNavigator from './navigation/AppNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchData();
  }, []);
  const Stack = createNativeStackNavigator();

  return (
    // <View>
    //   <Text>Recipe List</Text>
    //   {recipes.map(recipe => (
    //     <View key={recipe.idMeal}>
    //       <Text>
    //         {recipe.strMeal} - {recipe.strArea}
    //       </Text>
    //       <Text>Ingredients:</Text>
    //       <View>
    //         {recipe.strIngredients.map((ingredient, index) => (
    //           <Text key={index}>{ingredient}</Text>
    //         ))}
    //       </View>
    //       <Text>{recipe.strInstructions}</Text>
    //     </View>
    //   ))}
    // </View>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Recipes">
    //     <Stack.Screen
    //       name="Recipes"
    //       component={RecipesScreen}
    //       options={{title: 'Recipes'}}
    //     />
    //     <Stack.Screen
    //       name="Chart"
    //       component={ChartScreen}
    //       options={{title: 'Recipe Chart'}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <AppNavigator />

    //<RecipesScreen />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
