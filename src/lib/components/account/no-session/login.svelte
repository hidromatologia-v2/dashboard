<script lang="ts">
	import { login } from '$lib/api/login';
	import { session } from '$lib/stores/session';

	let username: string;
	let password: string;
	let errorMessage: string | undefined;
	function doLogin(): void {
		login(username, password)
			.then((token: string) => {
				$session = token;
				errorMessage = username = password = '';
			})
			.catch((error: string) => {
				errorMessage = error;
				password = '';
			});
	}
</script>

<form on:submit|preventDefault={doLogin}>
	<div class="flex flex-col justify-center items-center">
		<h3 class="font-bold text-3xl m-5">Login</h3>
		{#if errorMessage !== undefined}
			<div class="alert alert-error shadow-lg mb-5">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{errorMessage}</span>
				</div>
			</div>
		{:else}
			<div class="alert alert-info shadow-lg mb-5">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current flex-shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Please login to access extra features</span>
				</div>
			</div>
		{/if}
		<input
			bind:value={username}
			type="text"
			placeholder="Username"
			required
			class="input w-full input-bordered mb-5"
		/>
		<input
			bind:value={password}
			type="password"
			placeholder="Password"
			required
			class="input w-full input-bordered mb-5"
		/>
		<button type="submit" class="btn btn-primary">Login</button>
	</div>
</form>
