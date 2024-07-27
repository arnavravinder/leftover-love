<script lang="ts">
	import RestaurantList from '$lib/components/RestaurantList.svelte';
	import { session } from '$lib/session';
	import RestaurantHome from '$lib/components/RestaurantHome.svelte';
</script>

<div>
	{#if $session?.userData?.isUser}
		<RestaurantList />
	{:else if $session?.user?.uid}
		<RestaurantHome />
	{/if}
</div>
