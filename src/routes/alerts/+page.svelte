<script lang="ts">
	import { searchAlerts, type Alert } from '$lib/api/alerts';
	import type { Filter, Results } from '$lib/api/utils';
	import Create from '$lib/components/alerts/create/create.svelte';
	import Search from '$lib/components/alerts/search/search.svelte';
	import Error from '$lib/components/error/error.svelte';
	import { session } from '$lib/stores/session';

	//
	let errorMessage: string;
	let alerts: Results<Alert>;
	let filter: Filter<Alert>;

	function doRefresh(newPage: number): () => void {
		return () => {
			filter.page = newPage;
			searchAlerts($session, filter)
				.then((results: Results<Alert>) => {
					alerts = results;
					errorMessage = '';
				})
				.catch((error: string) => {
					errorMessage = error;
				});
		};
	}
</script>

<div>
	<div>
		<Search bind:errorMessage bind:alerts bind:filter />
		<!--TODO: Create station modal-->
		<Create />
	</div>
	<Error bind:errorMessage />
	{#key alerts}
		{#if alerts}
			{#each alerts.entries as entry, index}
				<div>
					{index}
				</div>
			{/each}
			<div class="btn-group">
				{#if alerts.page > 1}
					<button class="btn btn-primary" on:click={doRefresh(alerts.page--)}>«</button>
				{/if}
				<button class="btn btn-primary">Page {alerts.page}</button>
				{#if alerts.count == alerts.pageSize}
					<button class="btn btn-primary" on:click={doRefresh(alerts.page++)}>»</button>
				{/if}
			</div>
		{/if}
	{/key}
</div>
