<script lang="ts">
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import { db } from '$lib/firebase.client.js';
	import type { Item } from '$lib/item.js';
	import type { Restaurant } from '$lib/restaurant.js';
	import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let data;
	let restaurant: Restaurant;
	let items: Item[] = [];

	onMount(async () => {
		restaurant = (await getDoc(doc(db, 'restaurants', data.id))).data() as Restaurant;
		const q = await getDocs(query(collection(db, 'items'), where('restaurantId', '==', data.id)));
		q.forEach((val) => {
			console.log(val.data());
			items = [...items, { ...val.data(), id: val.id } as Item];
		});
	});
</script>

<div class="m-8">
	{#if restaurant}
		<div class="flex">
			<img src={restaurant.photo} class="mr-8 w-96" />
			<div class="flex flex-col justify-center">
				<h1 class="text-blueNew text-4xl font-bold">{restaurant.name}</h1>
				<p>{restaurant.city}</p>
			</div>
		</div>
		<div class="mt-2 flex flex-col gap-2">
			{#each items as item}
				<ItemDisplay {item} />
			{/each}
		</div>
	{:else}
		<h1>Loading...</h1>
	{/if}
</div>
