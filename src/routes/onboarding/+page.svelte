<script lang="ts">
	import { goto } from "$app/navigation";
	import { db } from "$lib/firebase.client";
	import { session } from "$lib/session";
	import { addDoc, collection } from "firebase/firestore";

    let foodPref: "veg" | "nonVeg" | "vegan";

    $: console.log(foodPref);
</script>

<div>
    <h2>Welcome to Plateful!</h2>
    <p>Answer a few questions and get on your way</p>
    <form on:submit={async () => {
        await addDoc(collection(db, "userInfo"), {foodPref, isUser: true, uid: $session?.user?.uid});
        goto("/");
    }}>
        <select bind:value={foodPref}>
            <option value="veg">Vegetarian</option>
            <option value="nonVeg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
        </select>
        <button type="submit">Submit</button>
    </form>
</div>