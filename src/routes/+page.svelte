<script lang="ts">
	import RestaurantList from '$lib/components/RestaurantList.svelte';
	import { db } from '$lib/firebase.client';
	import type { FoodType, Item } from '$lib/item';
	import type { Restaurant } from '$lib/restaurant';
	import { session } from '$lib/session';
	import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
	import { DateInput } from 'date-picker-svelte';

	let restaurants: Restaurant[] = [];
	let items: Item[][] = [];
	let itemInput = '';
	let priceInput = 0;
	let typeInput: FoodType = 'nonVeg';
	let timeInput = new Date();

	$: {
		if (!$session?.userData?.isUser && $session?.user?.uid && db) {
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
	}
</script>

{#if $session?.userData?.isUser}
	<RestaurantList />
{:else}
	{#each restaurants as restaurant, i}
		<h2>{restaurant.name}</h2>

		{#each items[i] as item}
			<h3>{item.name}</h3>
			<p>{item.price}</p>
			<p>{item.type}</p>
		{/each}

		<form
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
			<input type="text" bind:value={itemInput} />
			<input type="number" bind:value={priceInput} />
			<select bind:value={typeInput}>
				<option value="veg">Vegetarian</option>
				<option value="nonVeg">Non-Vegetarian</option>
				<option value="vegan">Vegan</option>
			</select>
			<DateInput
				format="YYYY-mm-dd hh:mm"
				bind:value={timeInput}
				min={new Date()}
				timePrecision="minute"
			/>
			<button type="submit">Add Item</button>
		</form>
	{/each}
{/if}
