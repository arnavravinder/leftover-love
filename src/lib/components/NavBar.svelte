<script lang="ts">
	import { session } from '$lib/session';
	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { signOut, type User } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.client';
	import CartIcon from '~icons/mdi/cart';
	import logo from '$lib/assets/logo.png';
	import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import Button from '$lib/components/Button.svelte';
	import { restaurant, type Restaurant } from '$lib/restaurant';
	import type { LayoutData } from '../../routes/$types';

	export let data: LayoutData;
	let loading: boolean = true;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
	});

	onMount(async () => {
		const user = (await data.getAuthUser()) as User;
		if (!user.uid) return;
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

		if (!userData.isUser) {
			const restaurantQuery = query(
				collection(db, 'restaurants'),
				where('ownerUid', '==', user.uid)
			);
			const restaurantDocs = await getDocs(restaurantQuery);
			if (restaurantDocs.empty) {
				throw Error('User is not owner of restaurant');
			}
			const restaurantData = restaurantDocs.docs[0].data();

			restaurant.set({ ...(restaurantData as Restaurant), id: restaurantDocs.docs[0].id });
		}
	});
</script>

<div class="flex h-16 items-center gap-2 bg-headerBg p-2 shadow">
	<a href="/"><img class="w-16" alt="logo" src={logo} /></a>
	{#if $session?.loggedIn}
		<p class="ml-auto text-2xl">{$session?.userData?.name}</p>
		{#if $session?.userData?.isUser}
			<a href="/cart"><CartIcon class="my-auto" /></a>
		{/if}
		<Button
			text="Sign Out"
			onClick={() => {
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
			}}
		/>
	{:else}
		<a
			class="ml-auto rounded-md bg-slate-400 p-2 transition-colors hover:bg-slate-500"
			href="/login">Sign In</a
		>
	{/if}
</div>
