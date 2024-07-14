export type Order = {
	uid: string;
	restaurantId: string;
	items: string[];
	quantities: number[];
	completed: boolean;
	name: string;
};
