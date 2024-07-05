<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import { db } from '$lib/firebase.client.js';
	import type { Item } from '$lib/item.js';
	import type { Restaurant } from '$lib/restaurant.js';
	import { session } from '$lib/session';
	import {
		arrayUnion,
		collection,
		doc,
		FieldValue,
		getDoc,
		getDocs,
		getFirestore,
		query,
		Timestamp,
		updateDoc,
		where
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let data;
	let restaurant: Restaurant;
	let items: Item[] = [];

	onMount(async () => {
		restaurant = (await getDoc(doc(db, 'restaurants', data.id))).data() as Restaurant;
		const q = await getDocs(query(collection(db, 'items'), where('restaurantId', '==', data.id)));
		q.forEach((val) => {
			console.log(val.data());
			items = [...items, val.data() as Item];
		});
	});
</script>

{#if restaurant}
	<h1 class="text-center text-4xl">{restaurant.name}</h1>

	<div class="m-2 flex flex-col gap-2">
		{#each items as item}
			<ItemDisplay {item} />
		{/each}
	</div>
{:else}
	<h1>Loading...</h1>
{/if}
