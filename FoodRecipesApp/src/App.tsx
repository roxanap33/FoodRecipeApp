import {useEffect, useState} from 'react';
import {fetchRecipes} from './utils/mealdb-api';
import AppNavigator from './navigation/AppNavigator';
import {Recipe} from './utils/types';

function App(): React.JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    fetchData();
  }, []);

  return <AppNavigator />;
}

export default App;
