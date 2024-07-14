<script lang="ts">
	import type { CartItem } from '$lib/cart';
	import { db } from '$lib/firebase.client';
	import type { Order } from '$lib/order';
	import { restaurant, type Restaurant } from '$lib/restaurant';
	import {
		collection,
		doc,
		documentId,
		getDocs,
		getFirestore,
		query,
		updateDoc,
		where
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	let orders: (Order & { id: string })[] = [];
	let items: CartItem[][] = [];

	onMount(async () => {
		const q = query(
			collection(db, 'orders'),
			where('restaurantId', '==', $restaurant.id),
			where('completed', '==', false)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((val) => {
			orders = [...orders, { id: val.id, ...(val.data() as Order) }];
		});

		orders.forEach(async (val, i) => {
			if (items.length <= i) {
				items.push([]);
			}
			const q = query(collection(db, 'items'), where(documentId(), 'in', val.items));
			const result = await getDocs(q);
			result.docs.forEach((item, j) => {
				items[i] = [
					...items[i],
					{ ...item.data(), id: item.id, quantity: val.quantities[j] } as CartItem
				];
			});
		});
	});

	$: totals = items.map((val) => {
		return val.reduce((x, cur) => x + cur.quantity * cur.price, 0);
	});
</script>

<div class="m-2">
	{#each orders as order, i}
		<div class="flex flex-col rounded-xl bg-slate-100 p-2">
			<h2 class="text-center text-4xl font-bold">Order No. {i + 1}</h2>
			<h3>Ordered by: {order.name}</h3>
			<table class="border-collapse border">
				<thead class="border">
					<tr>
						<th class="border p-1 text-xl">Item Name</th>
						<th class="border p-1 text-xl">Item Quantity</th>
						<th class="border p-1 text-xl">Unit Price</th>
						<th class="border p-1 text-xl">Price</th></tr
					>
				</thead>
				{#each items[i] as item}
					<tr>
						<td class="border p-1">{item.name}</td>
						<td class="border p-1 text-right">{item.quantity}</td>
						<td class="border p-1 text-right">{item.price}</td>
						<td class="border p-1 text-right">{item.price * item.quantity}</td>
					</tr>
				{/each}
				<tfoot>
					<tr>
						<td class="border p-1 font-bold">Total</td>
						<td class="border p-1"></td>
						<td class="border p-1"></td>
						<td class="border p-1 text-right font-bold">{totals[i]}</td>
					</tr>
				</tfoot>
			</table>
			<Button
				text="Mark as completed"
				class="mt-2"
				onClick={() => {
					if (confirm('Are you sure you want to mark this order as complete?')) {
						updateDoc(doc(db, 'orders', order.id), { completed: true });
						orders = [...orders.toSpliced(i, 1)];
					}
				}}
			/>
		</div>
	{/each}
</div>
