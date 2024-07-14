<script lang="ts">
	import RestaurantOrders from '$lib/components/RestaurantOrders.svelte';
	import { session } from '$lib/session';
</script>

{#if $session?.userData?.isUser}
	hi
{:else}
	<RestaurantOrders />
{/if}
