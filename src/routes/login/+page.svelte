<script lang="ts">
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithPhoneNumber,
		type ConfirmationResult
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { recaptchaStore, recaptchaValidStore } from '$lib/auth';
	import { get } from 'svelte/store';

	let confirmation: ConfirmationResult;

	async function handlePhoneSubmit() {
		if (!phoneNumberFormValid) {
			return;
		}

		loading = true;

		const fullPhoneNumber = `+${countryCode! + phoneNumberBody!}`;

		const appVerifier = get(recaptchaStore);
		if (!appVerifier) return;

		confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, get(recaptchaStore));

		loading = false;
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

	async function handleOTPSubmit() {
		if (!OTPFormValid) {
			return;
		}

		loading = true;

		try {
			const result = await confirmation.confirm(OTPCode!);
			const { email, photoURL, uid, phoneNumber } = result!.user;
			console.log(result);
			session.set({
				loggedIn: true,
				user: {
					displayName: phoneNumber,
					email,
					photoURL,
					uid
				},
				userData: null
			});

			goto('/');
		} catch (error) {
			console.log(error);
		}

		loading = false;
	}

	let countryCode = '';
	let phoneNumberBody = '';
	let loading = false;
	let OTPCode = '';

	$: countryCodeValid = countryCode !== null && countryCode.length !== 0;
	$: phoneNumberBodyValid = phoneNumberBody !== null && phoneNumberBody.length !== 0;

	$: phoneNumberFormValid =
		$recaptchaValidStore && countryCodeValid && phoneNumberBodyValid && !loading;

	$: OTPFormValid = OTPCode.length === 6 && confirmation && !loading;
</script>

<div class="m-4 mx-auto flex w-96 flex-col items-center gap-2 rounded-xl bg-slate-200 p-2">
	<h1 class="text-center text-4xl">Login</h1>
	{#if !confirmation}
		<form class="flex flex-col gap-2" on:submit={handlePhoneSubmit}>
			<input
				class="rounded-md p-2"
				type="text"
				bind:value={countryCode}
				placeholder="Country Code"
			/>
			<input
				class="rounded-md p-2"
				type="text"
				bind:value={phoneNumberBody}
				placeholder="Phone Number"
			/>
			<div id="recaptcha-container"></div>
			<Button type="submit" text="Send OTP" />
		</form>
	{:else}
		<form class="flex flex-col gap-2" on:submit={handleOTPSubmit}>
			<input
				class="rounded-md p-2"
				type="text"
				bind:value={OTPCode}
				on:input={() => {
					if (OTPCode.length > 6) OTPCode = OTPCode.substring(0, 6);
				}}
				placeholder="OTP"
			/>
			<Button disabled={OTPCode.length < 6} type="submit" text="Submit" />
		</form>
	{/if}

	<div>or</div>

	<Button onClick={loginWithGoogle} text="Login with Google" />
	<div>Don't you have an account? <a href="/register"> Register</a></div>
</div>
