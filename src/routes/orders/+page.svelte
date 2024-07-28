<script lang="ts">
	import { goto } from '$app/navigation';
	import RestaurantOrders from '$lib/components/RestaurantOrders.svelte';
	import { session } from '$lib/session';

	if ($session?.userData?.isUser) goto('/');
</script>

<svelte:head>
	<title>Plateful | Cart</title>
</svelte:head>

<RestaurantOrders />
