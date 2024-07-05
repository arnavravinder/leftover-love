<script lang="ts">
	import { db } from '$lib/firebase.client';
	import type { Restaurant } from '$lib/restaurant';
	import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import IconStar from '~icons/mdi/star';

	let restaurants: Restaurant[] = [];

	onMount(async () => {
		const q = query(collection(db, 'restaurants'));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((val) => {
			restaurants = [...restaurants, { id: val.id, ...(val.data() as Restaurant) }];
		});
	});
</script>

<div class="m-2">
	{#each restaurants as restaurant}
		<div class="flex flex-row">
			<a href={'/restaurant/' + restaurant.id} class="text-2xl">{restaurant.name}</a>
			<IconStar class="ml-auto" />
			<p>{restaurant.avgRating}</p>
		</div>
	{/each}
</div>
