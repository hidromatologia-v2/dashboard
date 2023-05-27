<script lang="ts">
	import { login } from '$lib/api/login';
	import Error from '$lib/components/error/error.svelte';
	import { session } from '$lib/stores/session';

	let username: string;
	let password: string;
	let errorMessage: string;
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
		<Error bind:errorMessage />
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
		<a class="link link-info mb-3" href="/reset/password">Reset password</a>
		<button type="submit" class="btn btn-primary">Login</button>
	</div>
</form>
