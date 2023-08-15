<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<main>
	<Navigation />
	<div class="main-content">
		<slot />
	</div>
</main>

<style global>
	@import '../style/variables.css';
	@import '../style/reset.css';
	main {
		--content-padding: 12px;
		--gutter-width: 128px;

		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow-y: auto;
		background-color: var(--background-primary);
		color: var(--font-primary);
		padding-top: calc(var(--navigation-height) + var(--content-padding));
	}
	.main-content {
		padding-left: var(--gutter-width);
		padding-right: var(--gutter-width);
	}
</style>
