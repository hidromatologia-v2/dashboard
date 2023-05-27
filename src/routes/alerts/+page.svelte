<script lang="ts">
	import { searchAlerts, type Alert, type Condition } from '$lib/api/alerts';
	import type { Filter, Results } from '$lib/api/utils';
	import Create from '$lib/components/alerts/create/create.svelte';
	import Error from '$lib/components/error/error.svelte';
	import { session } from '$lib/stores/session';
	import { onMount } from 'svelte';

	// Filter settings
	let page: number;
	let pageSize: number;
	let name: string;
	let sensorUUID: string;
	let condition: Condition;
	let value: number;
	let enabled: boolean;

	//
	let errorMessage: string;

	function filter(): Filter<Alert> {
		return {
			page: page,
			pageSize: pageSize,
			target: {
				name: name ? name : undefined,
				sensorUUID: sensorUUID ? sensorUUID : undefined,
				condition: condition ? condition : undefined,
				value: value ? value : undefined,
				enabled: enabled ? enabled : undefined
			}
		};
	}

	function doRefresh(): void {
		searchAlerts($session, filter())
			.then((results: Results<Alert>) => {
				console.log(results);
			})
			.catch((error: string) => (errorMessage = error));
	}
	onMount(doRefresh);
</script>

<div>
    <div>
        <!--TODO: Search filters-->
        <!--TODO: Create station modal-->
        <Create {doRefresh}/>
    </div>
    <Error bind:errorMessage/>
    <!--TODO: Results-->
    <!--TODO: Pagination-->
</div>
