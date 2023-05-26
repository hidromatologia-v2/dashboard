<script lang="ts">
	import { accountDetails, updateAccountDetails } from '$lib/api/account';
	import type { Account } from '$lib/api/account';
	import { onMount } from 'svelte';
	import { session } from '$lib/stores/session';
	import { UnauthorizedError } from '$lib/api/utils';
	import Label from '$lib/components/label/label.svelte';

	// Old values
	let username: string;
	let name: string;
	let email: string;
	let phone: string;
	let confirmed: boolean;

	// New values
	let newName: string;
	let newEmail: string;
	let newPhone: string;
	let newPassword: string;

	// Confirmation
	let oldPassword: string;
	let errorMessage: string | undefined;

	function doUpdateDetails(): void {
		updateAccountDetails($session, {
			user: {
				name: newName ? newName : undefined,
				email: newEmail ? newEmail : undefined,
				phone: newPhone ? newPhone : undefined,
				password: newPassword ? newPassword : undefined
			},
			oldPassword
		})
			.then(() => {
				errorMessage = oldPassword = newName = newEmail = newPhone = newPassword = '';
				refreshPage();
			})
			.catch((error: string) => {
				errorMessage = error;
				oldPassword = newPassword = '';
			});
	}

	function refreshPage(): void {
		accountDetails($session)
			.then((account: Account) => {
				username = account.username!;
				name = account.name!;
				email = account.email!;
				phone = account.phone!;
				confirmed = account.confirmed!;
			})
			.catch((error: string) => {
				switch (error) {
					case UnauthorizedError:
						$session = '';
						document.location.href = '/';
						return;
					default:
						errorMessage = error;
						return;
				}
			});
	}

	onMount(refreshPage);
</script>

<div class="flex justify-center p-5">
	<div class="card max-w-[500px] bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Account details</h2>
			{#if errorMessage !== undefined && errorMessage !== ''}
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
			{/if}
			<div class="flex flex-col w-full border-opacity-50">
				<Label>
					Username: <span class="text-blue-500 font-bold">{username}</span>
				</Label>
				<Label>Name: <span class="text-blue-500 font-bold">{name}</span></Label>
				<input
					bind:value={newName}
					type="text"
					placeholder="New name"
					class="input w-full input-bordered mb-5"
				/>
				<Label>Email: <span class="text-blue-500 font-bold">{email}</span></Label>
				<input
					bind:value={newEmail}
					type="email"
					placeholder="New email"
					class="input w-full input-bordered mb-5"
				/>
				<Label>Phone: <span class="text-blue-500 font-bold">{phone}</span></Label>
				<input
					bind:value={newPhone}
					type="text"
					placeholder="New phone"
					class="input w-full input-bordered mb-5"
				/>
				<Label>Confirmed: <span class="text-blue-500 font-bold">{confirmed}</span></Label>
				<Label>New password</Label>
				<input
					bind:value={newPassword}
					type="password"
					placeholder="New Password"
					class="input w-full input-bordered mb-5"
				/>
				<div class="divider">Update Account Details</div>
				<form on:submit|preventDefault={doUpdateDetails}>
					<div class="form-control">
						<div class="input-group">
							<input
								bind:value={oldPassword}
								type="password"
								placeholder="Old Password"
								required
								class="input w-full input-bordered mb-5"
							/>
							<button class="btn btn-primary">Update</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
