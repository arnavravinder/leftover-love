<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart';
	import Button from '$lib/components/Button.svelte';
	import ItemDisplay from '$lib/components/ItemDisplay.svelte';
	import { db, storage } from '$lib/firebase.client';
	import type { Order } from '$lib/order';
	import type { Restaurant } from '$lib/restaurant';
	import { session } from '$lib/session';
	import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let restaurant: Restaurant;

	if ($cart && $cart.restaurantId) {
		getDoc(doc(db, 'restaurants', $cart.restaurantId)).then((val) => {
			restaurant = val.data();
			console.log(restaurant);
		});
	}

	const placeOrder = async () => {
		if (!$session || !$session.user || !$session.user.uid) return;
		const storageRef = ref(storage, `${files[0].lastModified}-${files[0].name}`);
		const result = await uploadBytes(storageRef, files[0]);
		const photoURL = await getDownloadURL(storageRef);
		addDoc(collection(db, 'orders'), {
			uid: $session.user?.uid,
			items: $cart.items.map((val) => val.id),
			quantities: $cart.items.map((val) => val.quantity),
			completed: false,
			restaurantId: $cart.restaurantId,
			name: $session.userData?.name,
			paymentPhoto: photoURL
		} as Order);
		$cart.items = [];
		$cart.restaurantId = '';
		goto('/');
	};

	let files: FileList;

	$: total = $cart.items.reduce((x, val) => x + val.price * val.quantity, 0);
</script>

<svelte:head>
	<title>Plateful | Cart</title>
</svelte:head>

<div class="m-4 flex flex-col">
	<h1 class="m-2 text-center text-4xl font-bold text-blueNew">My Cart</h1>
	<div class="rounded-lgp-4 flex flex-col gap-2">
		{#if $cart.items.length === 0}
			<p>Add some items to cart to get started!</p>
		{/if}
		{#each $cart.items as item}
			<ItemDisplay {item} />
		{/each}
	</div>
	<div class="my-8 flex flex-col gap-2 rounded-md bg-white p-4">
		<p class="text-4xl font-bold text-blueNew">Scan to Pay Rs. {total} to {restaurant?.name}</p>
		{#if restaurant}
			<img
				class="w-48"
				src={`https://upiqr.in/api/qr?vpa=${restaurant.upi}i&name=${restaurant.name}&amount=${total}`}
			/>
		{:else}
			<p>Loading QR Code</p>
		{/if}
		<p class="font-bold">Upload payment screenshot</p>
		<input bind:files type="file" />
	</div>
	<Button
		onClick={placeOrder}
		text="Place Order"
		disabled={!$session || !$session.user || !$session.user.uid}
		class="ml-auto mr-4 w-40 bg-blueNew text-white"
	/>
</div>
