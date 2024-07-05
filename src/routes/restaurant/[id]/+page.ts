import { db } from '$lib/firebase.client.js';
import { collection, doc, getDoc, getFirestore, query, where } from 'firebase/firestore';

export async function load({ params }) {
	return { id: params.id };
}
