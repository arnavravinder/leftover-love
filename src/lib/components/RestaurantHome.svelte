<script lang="ts">
	import { db, storage } from '$lib/firebase.client';
	import type { FoodType, Item } from '$lib/item';
	import type { Restaurant } from '$lib/restaurant';
	import {
		addDoc,
		collection,
		deleteDoc,
		doc,
		getDocs,
		query,
		Timestamp,
		where
	} from 'firebase/firestore';
	import { DateInput } from 'date-picker-svelte';
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import Button from '$lib/components/Button.svelte';
	import { session } from '$lib/session';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let files: FileList;

	let restaurants: Restaurant[] = [];
	let items: Item[][] = [];
	let itemInput = '';
	let descInput = '';
	let priceInput: number;
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
								items[idx] = [...items[idx], { id: y.id, ...(y.data() as Item) }];
							});
						}
					);
				}
			});
		});
	}
</script>

{#each restaurants as restaurant, i}
	<h1 class="my-2 text-center text-4xl font-bold text-blueNew">{restaurant.name}</h1>

	<form
		class="mx-8 flex flex-col gap-2 rounded-lg bg-white p-8"
		on:submit={async () => {
			const storageRef = ref(storage, `${files[0].lastModified}-${files[0].name}`);
			const result = await uploadBytes(storageRef, files[0]);
			const photoURL = await getDownloadURL(storageRef);
			const newItem = {
				restaurantId: restaurant.id,
				name: itemInput,
				price: priceInput,
				type: typeInput,
				expiry: Timestamp.fromDate(timeInput),
				description: descInput,
				photo: photoURL
			};
			await addDoc(collection(db, 'items'), newItem);
			items[i] = [...items[i], newItem];
			itemInput = '';
			priceInput = undefined;
			typeInput = 'nonVeg';
			descInput = '';
			timeInput = undefined;
		}}
	>
		<p class="text-4xl font-bold text-blueNew">Add New Item</p>
		<input
			class="w-full rounded-md border p-2"
			type="text"
			bind:value={itemInput}
			placeholder="Item name"
		/>
		<input
			class="w-full rounded-md border p-2"
			type="text"
			bind:value={descInput}
			placeholder="Item description"
		/>
		<input
			class="w-full rounded-md border p-2"
			type="number"
			bind:value={priceInput}
			placeholder="Item price"
		/>
		<select class="rounded-md p-2" bind:value={typeInput}>
			<option value="veg">Vegetarian</option>
			<option value="nonVeg">Non-Vegetarian</option>
			<option value="vegan">Vegan</option>
		</select>
		<input
			class="w-full rounded-md border p-2"
			type="file"
			accept="image/*"
			bind:files
			placeholder="Upload"
		/>
		<DateInput
			format="dd-MM-yyyy HH:mm"
			bind:value={timeInput}
			min={new Date()}
			timePrecision="minute"
			placeholder="Expiry Date"
			class="w-full"
		/>
		<Button type="submit" text="Add Item" />
	</form>

	<div class="m-8 rounded-lg bg-white p-8">
		<h2 class="text-4xl font-bold text-blueNew">Your Menu</h2>
		{#each items[i] as item, j}
			<ItemDisplay
				{item}
				isUser={false}
				onRemove={async () => {
					await deleteDoc(doc(db, 'items', item.id));
					items[i] = items[i].toSpliced(j, 1);
				}}
			/>
		{/each}
	</div>
{/each}
