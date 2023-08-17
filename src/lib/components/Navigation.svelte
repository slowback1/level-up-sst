<nav>
	<div class="nav-links">
		<a href="/blog/create">Create Article</a>
		<a href="/">Home</a>
	</div>
</nav>

<style>
	nav {
		height: var(--navigation-height);
		width: 100%;
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		background-color: var(--background-secondary);
		color: var(--font-secondary);
	}
	.nav-links {
		display: flex;
		justify-content: flex-end;
		margin-right: 20px;
		align-items: center;
		gap: 12px;
	}
	a {
		font-size: 1.25rem;
	}
</style>
