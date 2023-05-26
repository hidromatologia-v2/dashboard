<script lang="ts">
	import { accountDetails, updateAccountDetails } from '$lib/api/account';
	import type { Account } from '$lib/api/account';
	import { onMount } from 'svelte';
	import { session } from '$lib/stores/session';
	import { UnauthorizedError } from '$lib/api/utils';
	import Label from '$lib/components/label/label.svelte';
	import { requestAccountConfirmation } from '$lib/api/confirmation';
	import { browser } from '$app/environment';
	import Error from '$lib/components/error/error.svelte';

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
	let errorMessage: string;

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

	function doRequestConfirmation(): void {
		requestAccountConfirmation($session)
			.then(() => {
				if (browser && window) window.open('/account/confirm', '_blank')!.focus();
			})
			.catch((error: string) => {
				errorMessage = error;
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
			<Error bind:errorMessage/>
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
				<button
					class="btn btn-info mb-5 {confirmed ? 'btn-disabled' : ''}"
					on:click={doRequestConfirmation}>Confirm account</button
				>
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
