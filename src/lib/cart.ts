import type { Item } from './item';
import { storable } from './storable';

export type CartItem = Item & { quantity: number };
export type Cart = {
	items: CartItem[];
	restaurantId: string;
};

export let cart = storable<Cart>({ items: [], restaurantId: '' }, 'cart');
