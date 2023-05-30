<script lang="ts">
	import { Condition, type Alert, updateAlert, deleteAlert } from '$lib/api/alerts';
	import { session } from '$lib/stores/session';
	import { onMount } from 'svelte';

	export let alert: Alert;
	export let errorMessage: string;
	export let doRefreshPage: () => void;

	let name: string;
	let condition: Condition;
	let value: number;
	let enabled: boolean;

	function doUpdateAlert(): void {
		updateAlert($session, {
			uuid: alert.uuid,
			name,
			condition,
			value,
			enabled
		})
			.then(() => {})
			.catch((error: string) => {
				errorMessage = error;
			});
	}

	function doDeleteAlert(): void {
		deleteAlert($session, alert)
			.then(doRefreshPage)
			.catch((error: string) => {
				errorMessage = error;
			});
	}

	onMount(() => {
		name = alert.name!;
		condition = alert.condition!;
		value = alert.value!;
		enabled = alert.enabled!;
	});
</script>

<div class="indicator">
	<div class="indicator-item indicator-top">
		<button class="btn btn-circle btn-ghost" on:click={doDeleteAlert}>
			<svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
				/></svg
			>
		</button>
	</div>
	<div class="card shadow-xl">
		<div class="card-body">
			<form on:submit|preventDefault={doUpdateAlert}>
				<div class="form-control w-full">
					<input
						type="text"
						placeholder="Name"
						bind:value={name}
						class="card-title input input-bordered w-full"
					/>
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Condition</span>
						</label>
						<select class="select select-bordered w-full" bind:value={condition}>
							<option value={Condition.Invalid} disabled selected>Any</option>
							<option value={Condition.Gt}>Greater than</option>
							<option value={Condition.Ge}>Greater or equal</option>
							<option value={Condition.Lt}>Less than</option>
							<option value={Condition.Le}>Less or equal</option>
						</select>
					</div>
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Target value</span>
						</label>
						<input
							type="number"
							placeholder="Value"
							class="input input-bordered w-full"
							bind:value
						/>
					</div>
					<div class="form-control w-full">
						<label class="cursor-pointer label">
							<span class="label-text">Enabled</span>
							<input type="checkbox" class="toggle toggle-success" bind:checked={enabled} />
						</label>
					</div>
					<button type="submit" class="btn btn-success">Update</button>
				</div>
			</form>
		</div>
	</div>
</div>
