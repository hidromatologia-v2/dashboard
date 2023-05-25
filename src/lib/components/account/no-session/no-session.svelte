<script lang="ts">
	import Login from '$lib/components/account/no-session/login.svelte';
	import Register from '$lib/components/account/no-session/register.svelte';
</script>

<label for="login-modal" class="btn btn-ghost">Login</label>
<label for="register-modal" class="btn btn-ghost">Register</label>

<input type="checkbox" id="login-modal" class="modal-toggle" />
<label for="login-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<Login />
	</label>
</label>

<input type="checkbox" id="register-modal" class="modal-toggle" />
<label for="register-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<Register />
	</label>
</label>
