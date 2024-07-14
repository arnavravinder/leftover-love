import { storable } from './storable';

export type Restaurant = {
	avgRating: number;
	category: string;
	city: string;
	name: string;
	photo: string;
	id: string;
};

export const restaurant = storable<Restaurant>({}, 'restaurant');
