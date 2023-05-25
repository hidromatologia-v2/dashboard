<script lang="ts">
	import { session } from '$lib/stores/session';
	import NoSession from '$lib/components/account/no-session/no-session.svelte';
	import Session from '$lib/components/account/session/session.svelte';
</script>

{#if $session === ''}
	<NoSession />
{:else}
	<Session />
{/if}
