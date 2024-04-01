export interface Recipe {
  recipeId: string;
  recipeName: string;
  recipeCuisine: string;
  recipeInstructions: string;
  recipeIngredients: string[];
}

export interface TableProp {
  recipes: Recipe[];
}

export interface ModalProps {
  visible: boolean;
  text: string;
  onClose: () => void;
  title: string;
}
