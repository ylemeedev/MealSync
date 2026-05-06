import type { StaticScreenProps } from "@react-navigation/native";

export interface SharedProfiles {
    id: number;
    name: string;
    avatar: string;
}

export type FiltersType = "date" | "shop" | "budget" | "progression";

export type PriceByShop = Record<string, number>;
export type CompletedIngredients = Record<string, boolean>;
export interface ShopStats {
    total: PriceByShop;
    remaining: PriceByShop;
    ingredients: CompletedIngredients;
}

export interface CardHeaderProps {
    title?: string;
    date: string;
}

export interface CardContentProps {
    productsCurrent: number;
    productsTotal: number;
    budgetEstimated: number;
    shop: string;
    progress: number;
}

export interface CardFooterProps {
    sharedProfiles: SharedProfiles[];
}

export interface FiltersProps {
    handlePress(): void;
}

export type SortType = "date" | "shop" | "budget" | "progression";

export interface SortFormProps {
    onValueChange(filter: SortType): void;
}

export interface SearchFormProps {
    onChange(search: string): void;
}

export interface Shop {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ingredientShops {
    createdAt: string;
    updatedAt: string;
    price: number;
    shop: Shop;
}

export interface Ingredient {
    id: number;
    name: string;
    description: string;
    barcode: string;
    ingredientShops: ingredientShops[];
    createdAt: string;
    updatedAt: string;
}

export interface Recipe {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ShoppingListItem {
    id: number;
    ingredient: Ingredient;
    quantity: number;
    unit: string;
    isChecked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PlanningRecipe {
    id: number;
    timeOfDay: string;
    recipe: Recipe;
    createdAt: string;
    updatedAt: string;
}

export interface ShoppingList {
    id: number;
    name?: string;
    shoppingListItems: ShoppingListItem[];
    createdAt: string;
    updatedAt: string;
}

export interface Planning {
    id: number;
    weekNumber: number;
    year: number;
    shoppingLists: ShoppingList[];
    planningRecipes: PlanningRecipe[];
    createdAt: string;
    updatedAt: string;
}

export interface HydraResponse<T> {
    member: T[];
}

export interface ShoppingListsProps {
    shoppingLists: ShoppingList[];
}

export interface ShoppingCardProps {
    shoppingList: ShoppingList;
}

export type CheckedShoppingListScreenProps = StaticScreenProps<{
    shoppingListId: number;
}>;
