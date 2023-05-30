<script lang="ts">
	import { Condition, type Alert, searchAlerts } from '$lib/api/alerts';
	import type { Filter, Results } from '$lib/api/utils';
	import { session } from '$lib/stores/session';
	import { onMount } from 'svelte';

	export let errorMessage: string;
	export let alerts: Results<Alert>;
	export let filter: Filter<Alert>;

	// Filter settings
	let pageSize: number = 10;
	let name: string;
	let sensorUUID: string;
	let condition: Condition;
	let value: number;
	let enabled: boolean;

	// Construct the filter
	function updateFilter(): Filter<Alert> {
		filter = {
			page: 1,
			pageSize: pageSize,
			target: {
				name: name ? name : undefined,
				sensorUUID: sensorUUID ? sensorUUID : undefined,
				condition: condition && condition !== Condition.Invalid ? condition : undefined,
				value: value,
				enabled: enabled
			}
		};
		return filter;
	}

	function doSearch(): void {
		searchAlerts($session, updateFilter())
			.then((results: Results<Alert>) => {
				alerts = results;
				errorMessage = '';
			})
			.catch((error: string) => {
				errorMessage = error;
			});
	}

	onMount(doSearch);
</script>

<div class="form-control p-5">
	<form on:submit|preventDefault={doSearch}>
		<label class="input-group">
			<input
				type="text"
				placeholder="Alert name"
				class="input input-bordered w-full"
				bind:value={name}
			/>
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-primary rounded-none">
					<svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
						/></svg
					>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					<li>
						<div class="form-control w-full">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span class="label-text">Number of results</span>
							</label>
							<input
								type="range"
								min="10"
								max="100"
								class="range range-info"
								bind:value={pageSize}
							/>
						</div>
					</li>
					<li>
						<div class="form-control w-full">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span class="label-text">Value</span>
							</label>
							<input
								type="number"
								placeholder="Value"
								class="input input-bordered w-full max-w-xs"
								bind:value
							/>
						</div>
					</li>
					<li>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Active</span>
								<input type="checkbox" class="toggle toggle-info" bind:checked={enabled} />
							</label>
						</div>
					</li>
					<li>
						<div class="form-control w-full">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="label">
								<span class="label-text">Condition</span>
							</label>
							<select class="select select-bordered w-full max-w-xs" bind:value={condition}>
								<option value={Condition.Invalid} selected>Any</option>
								<option value={Condition.Gt}>Greater than</option>
								<option value={Condition.Ge}>Greater or equal</option>
								<option value={Condition.Lt}>Less than</option>
								<option value={Condition.Le}>Less or equal</option>
							</select>
						</div>
					</li>
				</ul>
			</div>
			<button class="btn btn-info">Search</button>
		</label>
	</form>
</div>
