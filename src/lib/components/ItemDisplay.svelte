<script lang="ts">
	import type { Item } from '$lib/item';
	import VeganIcon from '~icons/mdi/alpha-v';
	import VegIcon from '~icons/mdi/square-circle';
	import NonVegIcon from '~icons/mdi/triangle';
	import Button from './Button.svelte';
	import { session } from '$lib/session';

	export let item: Item;
	export let isUser: boolean = true;
</script>

<div class="flex flex-row gap-2">
	{#if item.type == 'veg'}
		<VegIcon class="my-auto text-green-500" />
	{:else if item.type == 'vegan'}
		<VeganIcon class="my-auto text-green-500" />
	{:else}
		<NonVegIcon class="my-auto text-red-800" />
	{/if}
	<h2 class="text-2xl">{item.name}</h2>
	{#if isUser}
		<Button
			onClick={async () => {
				if ($session?.user?.uid) {
					const cartDoc = doc(db, 'cart', $session?.user?.uid);
					const cartSnapshot = await getDoc(cartDoc);
					if (cartSnapshot.exists()) {
						await updateDoc(cartDoc, { items: arrayUnion(item) });
					}
				}
			}}
			text="Add to cart"
			class="ml-auto"
		/>
	{/if}
</div>
