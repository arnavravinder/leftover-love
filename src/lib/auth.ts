import { browser } from '$app/environment';
import { RecaptchaVerifier, useDeviceLanguage } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from './firebase.client';
import { setWindowProp } from './window';

export const recaptchaStore = writable<RecaptchaVerifier | null>();

export const recaptchaValidStore = writable(false, (set) => {
	if (!browser || document.getElementById('recaptcha-container') === null) {
		return;
	}

	useDeviceLanguage(auth);

	const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
		size: 'normal',
		callback: () => {
			set(true);
		}
	});

	recaptchaStore.set(recaptchaVerifier);

	recaptchaVerifier.render().then((widgetId) => {
		setWindowProp('recaptchaWidgetId', widgetId);
	});
});
