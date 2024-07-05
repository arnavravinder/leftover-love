<script lang="ts">
	import { db } from '$lib/firebase.client';
	import type { Restaurant } from '$lib/restaurant';
	import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let restaurants: Restaurant[] = [];

	onMount(async () => {
		const q = query(collection(db, 'restaurants'));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((val) => {
			restaurants = [...restaurants, { id: val.id, ...(val.data() as Restaurant) }];
		});
	});
</script>

<div>
	{#each restaurants as restaurant}
		<a href={'/restaurant/' + restaurant.id} class="text-m">{restaurant.name}</a>
		<h2>{restaurant.avgRating}</h2>
	{/each}
</div>
