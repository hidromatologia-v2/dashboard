<script lang="ts">
	import { searchAlerts, type Alert } from '$lib/api/alerts';
	import type { Filter, Results } from '$lib/api/utils';
	import Card from '$lib/components/alerts/card/card.svelte';
	import Create from '$lib/components/alerts/create/create.svelte';
	import Search from '$lib/components/alerts/search/search.svelte';
	import Error from '$lib/components/error/error.svelte';
	import { session } from '$lib/stores/session';

	//
	let errorMessage: string;
	let alerts: Results<Alert>;
	let filter: Filter<Alert>;

	function doRefreshPage(): void {
		searchAlerts($session, filter)
			.then((results: Results<Alert>) => {
				alerts = results;
				errorMessage = '';
			})
			.catch((error: string) => {
				errorMessage = error;
			});
	}

	function changePage(newPage: number): () => void {
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
		<div class="flex justify-end items-center p-5">
			<Create {doRefreshPage}/>
		</div>
	</div>
	<Error bind:errorMessage />
	{#key alerts}
		{#if alerts}
			<div class="flex justify-center items-center">
				<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
					{#each alerts.entries as entry}
						<Card bind:errorMessage alert={entry} {doRefreshPage} />
					{/each}
				</div>
			</div>
			<div class="flex justify-center items-center p-5">
				<div class="btn-group">
					{#if alerts.page > 1}
						<button class="btn btn-primary" on:click={changePage(alerts.page--)}>«</button>
					{/if}
					<button class="btn btn-primary">Page {alerts.page}</button>
					{#if alerts.count == alerts.pageSize}
						<button class="btn btn-primary" on:click={changePage(alerts.page++)}>»</button>
					{/if}
				</div>
			</div>
		{/if}
	{/key}
</div>
