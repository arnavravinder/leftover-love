import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export function storable<T>(data: T, key: string) {
	const store = writable(data);
	const { subscribe, set, update } = store;

	if (browser) {
		const stored = window.localStorage.getItem(key);
		if (stored !== null) set(JSON.parse(stored));
	}

	return {
		subscribe,
		set: (val: T) => {
			if (browser) {
				console.log('update');
				window.localStorage.setItem(key, JSON.stringify(val));
			}
			set(val);
		},
		update: (updater: (val: T) => T) => {
			const updatedStore = updater(get(store));

			if (browser) {
				window.localStorage.setItem(key, JSON.stringify(updatedStore));
			}
			set(updatedStore);
		}
	};
}
