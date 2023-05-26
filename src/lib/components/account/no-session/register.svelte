<script lang="ts">
	import { register } from '$lib/api/register';
	import Error from '$lib/components/error/error.svelte';

	let username: string;
	let password: string;
	let name: string;
	let phone: string;
	let email: string;
	let errorMessage: string;
	function doRegister(): void {
		register(username, password, name, phone, email)
			.then(() => {
				errorMessage = username = password = name = phone = email = '';
			})
			.catch((error: string) => {
				errorMessage = error;
				password = '';
			});
	}
</script>

<form on:submit|preventDefault={doRegister}>
	<div class="flex flex-col justify-center items-center">
		<h3 class="font-bold text-3xl m-5">Register</h3>
		<Error bind:errorMessage/>
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
		<input
			bind:value={name}
			type="text"
			placeholder="Complete name"
			required
			class="input w-full input-bordered mb-5"
		/>
		<input
			bind:value={phone}
			type="text"
			placeholder="Phone number"
			required
			class="input w-full input-bordered mb-5"
		/>
		<input
			bind:value={email}
			type="text"
			placeholder="Email address"
			required
			class="input w-full input-bordered mb-5"
		/>
		<button type="submit" class="btn btn-primary">Register</button>
	</div>
</form>
