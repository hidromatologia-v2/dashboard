<script>
	import { session } from '$lib/stores/session';
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost btn-circle">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h7"
			/></svg
		>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
	>
		<!-- svelte-ignore a11y-missing-attribute -->
		<li><a href="/">Homepage</a></li>
		{#if $session}
			<li><a href="/alerts">Alerts</a></li>
		{/if}
	</ul>
</div>
