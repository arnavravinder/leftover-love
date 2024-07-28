<script lang="ts">
	import RestaurantList from '$lib/components/RestaurantList.svelte';
	import { session } from '$lib/session';
	import RestaurantHome from '$lib/components/RestaurantHome.svelte';
	import FoodIcon from '~icons/mdi/food';
	import QRIcon from '~icons/mdi/qrcode-scan';
	import PickupIcon from '~icons/mdi/car-pickup';
</script>

<svelte:head>
	<title>Plateful | Home</title>
</svelte:head>

<div>
	{#if $session?.userData?.isUser}
		<RestaurantList />
	{:else if $session?.user?.uid}
		<RestaurantHome />
	{:else}
		<div class="m-8 flex flex-col gap-8">
			<div class="rounded-md bg-slate-100 p-8 text-center shadow">
				<p class="text-4xl font-bold text-blueNew">Reducing Food Waste, One Plate at a Time</p>
				<p class="mt-4 text-xl text-slate-500">
					Join us in our mission to reduce food waste by connecting people with fresh leftover food
					from restaurants and cafes.
				</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<p class="text-3xl font-bold text-blueNew">Our Mission</p>
				<p class="mt-4 text-xl text-slate-500">
					At Plateful, our mission is to reduce food waste, promote sustainable consumption, and
					foster community connections. We aim to achieve this by connecting individuals with excess
					homegrown produce or leftover meals from restaurants and cafes with those who can utilize
					them.
				</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<p class="mb-4 text-3xl font-bold text-blueNew">How It Works</p>
				<div class="grid w-full grid-cols-3 gap-8">
					<div class="rounded-md bg-white p-4">
						<FoodIcon class="mx-auto h-16 w-16 text-center text-redNew" />
						<p class="text-2xl font-bold text-blueNew">Order Food</p>
						<p class="text-slate-500">
							Browse and order fresh leftover food from nearby restaurants and cafes.
						</p>
					</div>
					<div class="rounded-md bg-white p-4">
						<QRIcon class="mx-auto h-16 w-16 text-center text-redNew" />
						<p class="text-2xl font-bold text-blueNew">Scan UPI QR Code</p>
						<p class="text-slate-500">
							Scan the UPI QR code to make the payment and confirm your order.
						</p>
					</div>
					<div class="rounded-md bg-white p-4">
						<PickupIcon class="mx-auto my-2 h-16 w-16 text-center text-redNew" />
						<p class="text-2xl font-bold text-blueNew">Pick Up Food</p>
						<p class="text-slate-500">Visit the restaurant to pick up your fresh leftover food.</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
