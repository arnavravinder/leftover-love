<script lang="ts">
	import { goto } from '$app/navigation';
	import { db, storage } from '$lib/firebase.client';
	import { session } from '$lib/session';
	import { addDoc, collection } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let isUser: boolean;
	let name = '';
	let address = '';
	let phoneNumber = '';
	let URL = '';
	let upi = '';
	let step = 1;
	let files;
	let photoURL = '';
	$: nextDisabled = step == 1 && isUser === undefined;
</script>

<svelte:head>
	<title>Plateful | Onboarding</title>
</svelte:head>

<div class="flex h-full flex-col justify-center">
	<div class="m-4 mx-auto my-auto flex flex-col items-center gap-2 rounded-xl bg-white p-8 shadow">
		<p class="text-4xl font-bold text-blueNew">Welcome to Plateful!</p>
		{#if step == 1}
			<p class="text-2xl font-bold text-blueNew">1. Would you like to buy or sell food?</p>
			<select bind:value={isUser}>
				<option value={true}>Buy</option>
				<option value={false}>Sell</option>
			</select>
		{:else if step == 2 && !isUser}
			<p class="text-2xl font-bold text-blueNew">2. What's the name of your restaurant?</p>
			<input class="w-full rounded-md border p-2" placeholder="Enter name" bind:value={name} />
		{:else if step == 3 && !isUser}
			<p class="text-2xl font-bold text-blueNew">3. What's the address of your restaurant?</p>
			<input
				class="w-full rounded-md border p-2"
				placeholder="Enter address"
				bind:value={address}
			/>
		{:else if step == 4 && !isUser}
			<p class="text-2xl font-bold text-blueNew">4. What's the phone number of your restaurant?</p>
			<input
				class="w-full rounded-md border p-2"
				placeholder="Enter phone number"
				bind:value={phoneNumber}
			/>
		{:else if step == 5 && !isUser}
			<p class="text-2xl font-bold text-blueNew">
				5. What's the website / Google profile of your restaurant?
			</p>
			<input class="w-full rounded-md border p-2" placeholder="Enter URL" bind:value={URL} />
		{:else if step == 6 && !isUser}
			<p class="text-2xl font-bold text-blueNew">
				6. What's the UPI merchant code of your restaurant?
			</p>
			<input
				class="w-full rounded-md border p-2"
				placeholder="Enter UPI merchant code"
				bind:value={upi}
			/>
		{:else if step == 7 && !isUser}
			<p class="text-2xl font-bold text-blueNew">7. Upload a picture for your restaurant</p>
			<input class="w-full rounded-md border p-2" type="file" accept="image/*" bind:files />
		{:else if step == 2 && isUser}
			<p class="text-2xl font-bold text-blueNew">2. What's your name?</p>
			<input class="w-full rounded-md border p-2" placeholder="Enter name" bind:value={name} />
		{:else if step == 3 && isUser}
			<p class="text-2xl font-bold text-blueNew">3. What's your phone number?</p>
			<input
				class="w-full rounded-md border p-2"
				placeholder="Enter phone number"
				bind:value={phoneNumber}
			/>
		{/if}
		<div>
			<button
				class="rounded-md bg-redNew p-2 text-white disabled:opacity-75"
				disabled={step == 1}
				on:click={() => step--}>Back</button
			>
			<button
				class="rounded-md bg-redNew p-2 text-white disabled:opacity-75"
				on:click={async () => {
					if (!isUser && step < 7) step++;
					else if (!isUser) {
						const storageRef = ref(storage, `${files[0].lastModified}-${files[0].name}`);
						const result = await uploadBytes(storageRef, files[0]);
						photoURL = await getDownloadURL(storageRef);
						await addDoc(collection(db, 'restaurants'), {
							name,
							address,
							phoneNumber,
							URL,
							photo: photoURL,
							ownerUid: $session?.user?.uid,
							upi
						});
						await addDoc(collection(db, 'userInfo'), {
							isUser: false,
							uid: $session?.user?.uid,
							name
						});
						goto('/');
					} else if (isUser && step < 3) step++;
					else if (isUser) {
						await addDoc(collection(db, 'userInfo'), {
							isUser: true,
							uid: $session?.user?.uid,
							name,
							phoneNumber
						});
						goto('/');
					}
				}}
				disabled={nextDisabled}
				>{(step < 7 && !isUser) || (isUser && step < 3) ? 'Next' : 'Submit'}</button
			>
		</div>
	</div>
</div>
