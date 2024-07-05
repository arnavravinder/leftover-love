<script lang="ts">
	import { db } from '$lib/firebase.client.js';
	import type { Item } from '$lib/item.js';
	import type { Restaurant } from '$lib/restaurant.js';
	import {
		collection,
		doc,
		getDoc,
		getDocs,
		getFirestore,
		query,
		Timestamp,
		where
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let data;
	let restaurant: Restaurant;
	let items: Item[] = [];

	onMount(async () => {
		restaurant = (await getDoc(doc(getFirestore(), 'restaurants', data.id))).data() as Restaurant;
		const q = await getDocs(query(collection(db, 'items'), where('restaurantId', '==', data.id)));
		q.forEach((val) => {
			console.log(val.data());
			items = [...items, val.data() as Item];
		});
	});
</script>

{#if restaurant}
	<h1>{restaurant.name}</h1>

	{#each items as item}
		<h2>{item.name}</h2>
		<p>{item.type}</p>
		<button>Add to cart</button>
	{/each}
{:else}
	<h1>Loading...</h1>
{/if}
