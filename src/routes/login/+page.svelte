<script lang="ts">
	// login/+page.svelte
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	let email: string = '';
	let password: string = '';

	async function loginWithMail() {
		await signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const { user }: UserCredential = result;
				session.set({
					loggedIn: true,
					user: {
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
						uid: user?.uid
					}
				});
				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				const { displayName, email, photoURL, uid } = result?.user;
				session.set({
					loggedIn: true,
					user: {
						displayName,
						email,
						photoURL,
						uid
					},
					userData: null
				});

				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}
</script>

<div class="m-4 mx-auto flex w-96 flex-col items-center gap-2 rounded-xl bg-slate-200 p-2">
	<h1 class="text-center text-4xl">Login</h1>
	<form class="flex flex-col gap-2" on:submit={loginWithMail}>
		<input class="rounded-md p-2" bind:value={email} type="text" placeholder="Email" />
		<input class="rounded-md p-2" bind:value={password} type="password" placeholder="Password" />
		<Button type="submit" text="Sign in" onClick={loginWithMail} />
	</form>

	<div>or</div>

	<Button onClick={loginWithGoogle} text="Login with Google" />
	<div>Don't you have an account? <a href="/register"> Register</a></div>
</div>
