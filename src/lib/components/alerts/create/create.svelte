<script lang="ts">
	import { createAlert, Condition } from '$lib/api/alerts';
	import Error from '$lib/components/error/error.svelte';
	import { session } from '$lib/stores/session';

	export let doRefresh: () => void;

	let name: string;
	let sensorUUID: string;
	let condition: Condition;
	let value: number;
	let enabled: boolean;

	let errorMessage: string;

	function doCreate(): void {
		createAlert($session, {
			name,
			sensorUUID,
			condition,
			value,
			enabled
		})
			.then(() => {
				doRefresh();
				errorMessage = '';
			})
			.catch((error: string) => (errorMessage = error));
	}
</script>

<!-- The button to open modal -->
<label for="new-alert-modal" class="btn btn-success">New</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="new-alert-modal" class="modal-toggle" />
<label for="new-alert-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<h3 class="font-bold text-3xl m-5">New Alert</h3>
		<Error bind:errorMessage />
		<form on:submit|preventDefault={doCreate}>
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Alert name</span>
				</label>
				<input
					bind:value={name}
					type="text"
					placeholder="Name"
					required
					class="input w-full input-bordered"
				/>
			</div>
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Sensor UUID</span>
				</label>
				<input
					bind:value={sensorUUID}
					type="text"
					placeholder="Sensor UUID"
					required
					class="input w-full input-bordered"
				/>
			</div>
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Pick the condition</span>
				</label>
				<select class="select select-bordered" required bind:value={condition}>
					<option value={Condition.Ge}>Great or equal</option>
					<option value={Condition.Gt}>Great than</option>
					<option value={Condition.Le}>Less or equal</option>
					<option value={Condition.Lt}>Less than</option>
				</select>
			</div>
			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Target value</span>
				</label>
				<input
					bind:value
					type="number"
					placeholder="Target Value"
					required
					class="input w-full input-bordered"
				/>
			</div>
			<div class="form-control w-full mb-5">
				<label class="cursor-pointer label">
					<span class="label-text">Enabled</span>
					<input type="checkbox" class="toggle toggle-success" bind:checked={enabled} />
				</label>
			</div>
			<button type="submit" class="btn btn-primary">Create</button>
		</form>
	</label>
</label>
