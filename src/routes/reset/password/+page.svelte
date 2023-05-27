<script lang="ts">
	import { browser } from '$app/environment';
	import { requestPasswordReset } from '$lib/api/password';
	import Error from '$lib/components/error/error.svelte';

	let email: string;
	let errorMessage: string;
	function doRequestReset(): void {
		requestPasswordReset(email)
			.then(() => {
				errorMessage = '';
				if (browser && window) window.open('/reset/password/submit', '_blank')!.focus();
			})
			.catch((error: string) => {
				errorMessage = error;
			});
	}
</script>

<div class="flex justify-center p-5">
	<div class="card max-w-[500px] bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Request password reset</h2>
			<Error bind:errorMessage />
			<form on:submit|preventDefault={doRequestReset}>
				<input
					bind:value={email}
					type="email"
					placeholder="Email"
					class="input w-full input-bordered mb-5"
					required
				/>
				<button type="submit" class="btn btn-primary">Reset</button>
			</form>
		</div>
	</div>
</div>
