export interface Recipe {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strInstructions: string;
  strIngredients: string[];
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
