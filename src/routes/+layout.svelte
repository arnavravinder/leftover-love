<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto, invalidateAll } from '$app/navigation';
	import { signOut, type User } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.client';
	import '../app.css';

	import type { LayoutData } from './$types';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	export let data: LayoutData;

	let loading: boolean = true;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
	});

	onMount(async () => {
		const user = (await data.getAuthUser()) as User;
		const userDataQuery = query(collection(db, 'userInfo'), where('uid', '==', user.uid));
		const userDataDocs = await getDocs(userDataQuery);
		if (userDataDocs.empty) {
			goto('/onboarding');
		}
		let userData = {};
		userDataDocs.forEach((val) => {
			userData = val.data();
		});

		const loggedIn = !!user && user.uid;
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				userData,
				loggedIn,
				loading: false
			};
		});
	});
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div>
		<div class="flex h-16 items-center gap-2 bg-slate-300 p-2">
			{#if $session?.loggedIn}
				<p class="ml-auto text-2xl">{$session?.user?.displayName || $session?.user?.phoneNumber}</p>
				<button
					class="rounded-md bg-slate-400 p-2 transition-colors hover:bg-slate-500"
					on:click={() => {
						signOut(auth);
						session.update((cur) => {
							return {
								...cur,
								user: null,
								loggedIn: false,
								loading: false
							};
						});
						goto('/');
					}}>Sign Out</button
				>
			{:else}
				<button
					class="ml-auto rounded-md bg-slate-400 p-2 transition-colors hover:bg-slate-500"
					on:click={() => {
						goto('/login');
					}}>Sign In</button
				>
			{/if}
		</div>
		<slot />
	</div>
{/if}
