<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, googleAuthProvider } from '../config/firebase';

	async function signInWithGoogle() {
		try {
			await signInWithPopup(auth, googleAuthProvider);
		} catch (err) {
			console.log(err);
		}
	}
</script>

<button on:click={signInWithGoogle} class="p-2 bg-gray-700 text-md rounded-md"
	>Sign in with Google</button
>
