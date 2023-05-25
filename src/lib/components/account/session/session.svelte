<script lang="ts">
	import { session } from '$lib/stores/session';

	function doLogout(): void {
		$session = '';
	}
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost m-1">Account</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/account">Details</a></li>
		<li><button on:click={doLogout}>Logout</button></li>
	</ul>
</div>
