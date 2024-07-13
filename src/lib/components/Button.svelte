<script lang="ts">
	export let text: string = 'Press me';
	export let onClick: () => any = () => {};
	export let type: 'button' | 'submit' = 'button';
	export let disabled = false;
</script>

<button
	class={'rounded-md bg-slate-400 p-2 transition-all hover:bg-slate-500 disabled:opacity-75 disabled:hover:bg-slate-400 ' +
		$$props.class}
	on:click={onClick}
	{disabled}
	{type}>{text}</button
>
