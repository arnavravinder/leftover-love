<script lang="ts">
	export let text: string = 'Press me';
	export let onClick: () => any;
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	class={'rounded-md bg-slate-400 p-2 transition-colors hover:bg-slate-500 ' + $$props.class}
	on:click={onClick}
	{type}>{text}</button
>
