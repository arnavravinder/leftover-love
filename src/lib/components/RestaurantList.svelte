<script lang="ts">
	import { goto } from '$app/navigation';
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

<div class="m-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
	{#each restaurants as restaurant}
		<div
			class="flex cursor-pointer flex-col rounded-lg bg-white"
			role="menuitem"
			on:click={() => {
				goto('/restaurant/' + restaurant.id);
			}}
		>
			<img class="h-44 w-96 rounded-t-md object-cover" src={restaurant.photo} />
			<div class="m-4">
				<p class="text-2xl font-bold text-blueNew">
					{restaurant.name}
				</p>
			</div>
		</div>
	{/each}
</div>
