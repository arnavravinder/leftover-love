import type { Timestamp } from 'firebase/firestore';

export type Item = {
	price: number;
	type: FoodType;
	name: string;
	id: string;
	restaurantId: string;
	photo: string;
	description: string;
	expiry?: Timestamp;
};

export type FoodType = 'nonVeg' | 'veg' | 'vegan';
