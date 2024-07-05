export type Item {
    price: number;
    type: FoodType;
    name: string;
}

export type FoodType = "nonVeg" | "veg" | "vegan";