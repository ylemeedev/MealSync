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

export interface HeaderCheckedShoppingListProps {
    title: string;
}


export interface HydraResponse<T> {
    member: T[];
}

export interface ShoppingListWithProgress {
    id: number;
    name: string;
    weekNumber: number;
    year: number;
    createdAt: string;
    updatedAt: string;
    totalItems: number;
    checkedItems: number;
    progress: number;
    bestShop: string;
    bestPrice: number;
}

export interface Ingredient {
    id: number;
    name: string;
    description?: string;
    ingredientPicture?: string;
    barcode?: string;
}

export interface ShoppingListItemWithIngredient {
    id: number;
    ingredient: Ingredient;
    quantity?: number;
    unit?: string;
    isChecked: boolean;
}

export interface CardContentProps {
    checkedItems: number;
    totalItems: number;
    bestPrice: number;
    bestShop: string;
    progress: number;
}

export interface CardHeaderProps {
    title: string;
}

export interface ShoppingListCardProps {
    shoppingList: ShoppingListWithProgress;
}

export type CheckedShoppingListScreenProps = StaticScreenProps<{
    shoppingListId: number;
    shoppingListName: string;
}>;

export interface PayloadUpdateShoppingListItems {
    shoppingListItemId: number;
    isChecked: boolean;
}
