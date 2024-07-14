<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart';
	import Button from '$lib/components/Button.svelte';
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import { db } from '$lib/firebase.client';
	import type { Order } from '$lib/order';
	import { session } from '$lib/session';
	import { addDoc, collection } from 'firebase/firestore';

	const placeOrder = async () => {
		if (!$session || !$session.user || !$session.user.uid) return;
		addDoc(collection(db, 'orders'), {
			uid: $session.user?.uid,
			items: $cart.items.map((val) => val.id),
			quantities: $cart.items.map((val) => val.quantity),
			completed: false,
			restaurantId: $cart.restaurantId,
			name: $session.user.displayName ?? $session.user.phoneNumber
		} as Order);
		$cart.items = [];
		$cart.restaurantId = '';
		goto('/');
	};

	$: console.log($cart);
</script>

<div class="flex flex-col">
	<h1 class="m-2 text-center text-4xl">My Cart</h1>
	<div class="m-4 flex flex-col gap-2 rounded-lg bg-slate-100 p-4">
		{#if $cart.items.length === 0}
			<p>Add some items to cart to get started!</p>
		{/if}
		{#each $cart.items as item}
			<ItemDisplay {item} />
		{/each}
	</div>
	<Button
		onClick={placeOrder}
		text="Place Order"
		disabled={!$session || !$session.user || !$session.user.uid}
		class="ml-auto mr-4 w-40"
	/>
</div>
