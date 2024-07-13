<script lang="ts">
	import { db } from '$lib/firebase.client';
	import type { FoodType, Item } from '$lib/item';
	import type { Restaurant } from '$lib/restaurant';
	import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
	import { DateInput } from 'date-picker-svelte';
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import Button from '$lib/components/Button.svelte';
	import { session } from '$lib/session';

	let restaurants: Restaurant[] = [];
	let items: Item[][] = [];
	let itemInput = '';
	let priceInput = 0;
	let typeInput: FoodType = 'nonVeg';
	let timeInput: Date;
	$: {
		getDocs(
			query(collection(db, 'restaurants'), where('ownerUid', '==', $session?.user?.uid))
		).then((val) => {
			val.forEach((x) => {
				console.log(restaurants);
				if (!restaurants.some((val) => val.id == x.id)) {
					restaurants = [...restaurants, { ...(x.data() as Restaurant), id: x.id }];
					const idx = restaurants.length - 1;
					if (!items[idx] || !Array.isArray(items[idx])) {
						items[idx] = [];
					}

					getDocs(query(collection(db, 'items'), where('restaurantId', '==', x.id))).then(
						(itemsDocs) => {
							itemsDocs.forEach((y) => {
								items[idx] = [...items[idx], y.data() as Item];
							});
						}
					);
				}
			});
		});
	}
</script>

{#each restaurants as restaurant, i}
	<h1 class="text-center text-4xl">{restaurant.name}</h1>

	{#each items[i] as item}
		<ItemDisplay {item} isUser={false} />
	{/each}

	<form
		class="mx-auto flex w-1/2 flex-col gap-2 rounded-lg bg-slate-200 p-2"
		on:submit={async () => {
			await addDoc(collection(db, 'items'), {
				restaurantId: restaurant.id,
				name: itemInput,
				price: priceInput,
				type: typeInput,
				expiry: Timestamp.fromDate(timeInput)
			});
		}}
	>
		<input class="rounded-md p-2" type="text" bind:value={itemInput} placeholder="Item name" />
		<input class="rounded-md p-2" type="number" bind:value={priceInput} placeholder="Item price" />
		<select bind:value={typeInput}>
			<option value="veg">Vegetarian</option>
			<option value="nonVeg">Non-Vegetarian</option>
			<option value="vegan">Vegan</option>
		</select>
		<DateInput
			format="dd-MM-yyyy HH:mm"
			bind:value={timeInput}
			min={new Date()}
			timePrecision="minute"
			placeholder="Expiry Date"
		/>
		<Button onClick={() => {}} text="Add Item" />
	</form>
{/each}
