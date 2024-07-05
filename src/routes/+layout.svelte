<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto, invalidateAll } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.client';

	import type { LayoutData } from './$types';
	import { load } from './+layout';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	export let data: LayoutData;

	let loading: boolean = true;
	let loggedIn: boolean = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user = await data.getAuthUser();
		const userDataQuery = query(collection(db, 'userInfo'), where('uid', '==', user.uid));
		const userDataDocs = await getDocs(userDataQuery);
		if (userDataDocs.empty) {
			goto('/onboarding');
		}
		let userData = {};
		userDataDocs.forEach((val) => {
			userData = val.data();
		});

		const loggedIn = !!user && user?.emailVerified;
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
		{#if $session?.loggedIn}
			Logged in: {$session?.user?.displayName}
			<button
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
				on:click={() => {
					goto('/login');
				}}>Sign In</button
			>
		{/if}
		<slot />
	</div>
{/if}
