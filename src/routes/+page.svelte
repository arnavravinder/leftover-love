<script lang="ts">
	import RestaurantList from '$lib/components/RestaurantList.svelte';
	import { session } from '$lib/session';
	import RestaurantHome from '$lib/components/RestaurantHome.svelte';
	import Landing from '$lib/components/Landing.svelte';
	import FoodIcon from '~icons/mdi/food';
	import QRIcon from '~icons/mdi/qrcode-scan';
	import PickupIcon from '~icons/mdi/car-pickup';
</script>

<svelte:head>
	<title>Plateful | Home</title>
</svelte:head>

<div>
	{#if $session?.userData?.isUser}
		<RestaurantList />
	{:else if $session?.user?.uid}
		<RestaurantHome />
	{:else}
		<Landing />

	{/if}
</div>
