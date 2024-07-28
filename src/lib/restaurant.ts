import { storable } from './storable';

export type Restaurant = {
	avgRating: number;
	category: string;
	city: string;
	name: string;
	photo: string;
	id: string;
	upi: string;
	address: string;
};

export const restaurant = storable<Restaurant>({}, 'restaurant');
