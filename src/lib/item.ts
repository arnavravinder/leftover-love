export type Item = {
	price: number;
	type: FoodType;
	name: string;
	id: string;
	restaurantId: string;
};

export type FoodType = 'nonVeg' | 'veg' | 'vegan';
