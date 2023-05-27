<script lang="ts">
	import { browser } from '$app/environment';
	import { resetPassword } from '$lib/api/password';
	import Error from '$lib/components/error/error.svelte';

	let resetCode: string;
    let newPassword: string;
	let errorMessage: string;
	function doResetPassword(): void {
		resetPassword(resetCode, newPassword)
			.then(() => {
				errorMessage = '';
				if (browser && window) window.open('/')!.focus();
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
			<form on:submit|preventDefault={doResetPassword}>
				<input
					bind:value={resetCode}
					type="text"
					placeholder="Reset code"
					class="input w-full input-bordered mb-5"
					required
				/>
                <input
					bind:value={newPassword}
					type="password"
					placeholder="New password"
					class="input w-full input-bordered mb-5"
					required
				/>
				<button type="submit" class="btn btn-primary">Update Password</button>
			</form>
		</div>
	</div>
</div>
