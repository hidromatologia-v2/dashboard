<script lang="ts">
	import ThemeBtn from '$lib/components/theme/theme.svelte';
	import { Theme, theme } from '$lib/stores/dark';
	import Account from '$lib/components/account/account.svelte';
	import Navigation from '$lib/components/navbar/navigation/navigation.svelte';
</script>

<div data-theme={$theme === Theme.Light ? 'bumblebee' : 'halloween'} class="min-h-screen">
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<Navigation />
		</div>
		<div class="navbar-center">
			<ThemeBtn />
		</div>
		<div class="navbar-end">
			<Account />
		</div>
	</div>
	<slot />
</div>
