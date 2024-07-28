<script lang="ts">
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithPhoneNumber,
		type ConfirmationResult,
		useDeviceLanguage,
		RecaptchaVerifier
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { recaptchaStore } from '$lib/auth';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { setWindowProp } from '$lib/window';

	let confirmation: ConfirmationResult;

	onMount(() => {
		useDeviceLanguage(auth);

		const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
			size: 'normal'
		});

		recaptchaStore.set(recaptchaVerifier);

		recaptchaVerifier.render().then((widgetId) => {
			setWindowProp('recaptchaWidgetId', widgetId);
		});
	});

	async function handlePhoneSubmit() {
		if (!phoneNumberFormValid) {
			return;
		}

		loading = true;

		const fullPhoneNumber = `+91${phoneNumberBody!}`;
		console.log(fullPhoneNumber);

		const appVerifier = get(recaptchaStore);
		if (!appVerifier) return;

		confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);

		loading = false;
	}

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				if (!result) return;
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

	let phoneNumberBody = '';
	let loading = false;
	let OTPCode = '';

	$: phoneNumberBodyValid = phoneNumberBody !== null && phoneNumberBody.length !== 0;

	$: phoneNumberFormValid = phoneNumberBodyValid && !loading;

	$: OTPFormValid = OTPCode.length === 6 && confirmation && !loading;
</script>

<svelte:head>
	<title>Plateful | Login</title>
</svelte:head>

<div class="flex h-full flex-col justify-center">
	<div class="m-4 mx-auto my-auto flex flex-col items-center gap-2 rounded-xl bg-white p-8 shadow">
		<h1 class="text-center text-4xl font-bold text-blueNew">Login</h1>
		{#if !confirmation}
			<form class="flex flex-col gap-2" on:submit={handlePhoneSubmit}>
				<div class="flex">
					<p class="self-center rounded-l-md bg-gray-100 p-3">+91</p>
					<input
						class="w-full rounded-r-md border p-2"
						type="tel"
						bind:value={phoneNumberBody}
						placeholder="Enter phone number"
					/>
				</div>
				<div id="recaptcha-container" />
				<Button class="bg-redNew text-white" type="submit" text="Send OTP" />
			</form>
		{:else}
			<form class="flex flex-col gap-2" on:submit={handleOTPSubmit}>
				<input
					class="w-full rounded-md border p-2"
					type="text"
					bind:value={OTPCode}
					on:input={() => {
						if (OTPCode.length > 6) OTPCode = OTPCode.substring(0, 6);
					}}
					placeholder="OTP"
				/>
				<Button
					class="bg-redNew text-white"
					disabled={OTPCode.length < 6}
					type="submit"
					text="Submit"
				/>
			</form>
		{/if}

		<div>or</div>

		<Button
			class="w-full bg-blueNew text-white"
			onClick={loginWithGoogle}
			text="Login with Google"
		/>
	</div>
</div>
