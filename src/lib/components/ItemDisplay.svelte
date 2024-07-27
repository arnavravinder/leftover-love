<script lang="ts">
	import type { Item } from '$lib/item';
	import VeganIcon from '~icons/mdi/alpha-v-circle';
	import VegIcon from '~icons/mdi/square-circle';
	import NonVegIcon from '~icons/mdi/triangle';
	import CloseIcon from '~icons/mdi/close-thick';
	import Button from './Button.svelte';
	import { cart } from '$lib/cart';

	$: inCart = $cart.items.some((val) => val.id === item.id);
	$: idx = inCart ? $cart.items.findIndex((val) => val.id === item.id) : -1;

	export let item: Item;
	export let isUser: boolean = true;
	export let onRemove: () => void = () => {};
</script>

<div class="flex flex-row gap-2 bg-white p-4 shadow">
	<img src="https://via.placeholder.com/100x100" />
	<div class="flex flex-col">
		<div class="flex h-8 flex-row">
			<h2 class="text-blueNew mr-2 text-2xl font-bold">{item.name}</h2>
			{#if item.type == 'veg'}
				<VegIcon class="self-center text-green-500" />
			{:else if item.type == 'vegan'}
				<VeganIcon class="self-center text-green-500" font-size={20} />
			{:else}
				<NonVegIcon class="self-center text-red-800" />
			{/if}
		</div>
		<p>Description</p>
	</div>
	{#if isUser}
		{#if !inCart}
			<Button
				class="border-blueNew text-blueNew ml-auto self-center border bg-white text-sm"
				onClick={async () => {
					if ($cart.restaurantId === '') {
						$cart.restaurantId = item.restaurantId;
					} else if (item.restaurantId !== $cart.restaurantId) {
						if (
							confirm(
								'You can only add items from one restaurant at a time. Would you like to clear your cart to add this item?'
							)
						) {
							$cart.items = [];
							$cart.restaurantId = item.restaurantId;
						} else {
							return;
						}
					}

					$cart.items = [
						...$cart.items,
						{
							...item,
							quantity: 1
						}
					];
				}}
				text="ADD"
			/>
		{:else}
			<input
				class="ml-auto w-8 rounded-md bg-slate-200 p-1 text-center"
				type="number"
				bind:value={$cart.items[idx].quantity}
				on:blur={() => {
					if ($cart.items[idx].quantity == 0) $cart.items = $cart.items.toSpliced(idx, 1);
				}}
			/>
		{/if}
	{:else}
		<p class="ml-auto">
			Expires on: {item.expiry?.toDate().toLocaleString('en-IN', {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			})}
		</p>
		<button on:click={onRemove}><CloseIcon font-size="25" color="red" /></button>
	{/if}
</div>
