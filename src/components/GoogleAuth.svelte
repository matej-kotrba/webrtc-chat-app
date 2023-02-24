<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, googleAuthProvider } from '../config/firebase';
	import { signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		try {
			await signInWithPopup(auth, googleAuthProvider);
		} catch (err) {
			console.log(err);
		}
	}

	async function logOutFunc() {
		try {
			await signOut(auth);
		} catch (err) {
			console.log(err);
		}
	}
</script>

{#if !auth.currentUser}
	<button on:click={signInWithGoogle} class="p-2 bg-gray-700 text-md rounded-md hover:bg-slate-500">
		Sign in with Google
	</button>
{:else}
	<button on:click={logOutFunc} class="p-2 bg-gray-700 text-md rounded-md hover:bg-slate-500">
		Log out
	</button>
{/if}
