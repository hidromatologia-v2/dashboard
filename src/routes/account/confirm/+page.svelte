<script lang="ts">
	import { browser } from '$app/environment';
	import { confirmAccount } from '$lib/api/confirmation';
	import Error from '$lib/components/error/error.svelte';

	let confirmCode: string;
	let errorMessage: string;
	function doConfirmAccount(): void {
		confirmAccount(confirmCode)
			.then(() => {
				errorMessage = '';
				if (browser && window) window.open('/account', '_blank')!.focus();
			})
			.catch((error: string) => {
				errorMessage = error;
			});
	}
</script>

<div class="flex justify-center p-5">
	<div class="card max-w-[500px] bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Confirm Account</h2>
			<Error bind:errorMessage />
			<form on:submit|preventDefault={doConfirmAccount}>
				<input
					bind:value={confirmCode}
					type="text"
					placeholder="Confirm code"
					class="input w-full input-bordered mb-5"
					required
				/>
				<button type="submit" class="btn btn-primary">Confirm</button>
			</form>
		</div>
	</div>
</div>
