<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<div class="flex h-screen flex-col">
	<NavBar {data} />
	<slot />
</div>
