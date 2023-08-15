<script lang="ts">
	import type { BlogArticleData } from '$lib/types';

	export let article: BlogArticleData;
</script>

<a href={`/blog/${article.id}`}>
	<article>
		<h2>{article.attributes.Title}</h2>
	</article>
</a>

<style>
	article {
		width: 100%;
		height: 100%;
		border: 1px solid var(--background-secondary);
		padding: 12px;
		transform: translateX(0);
		transition: transform 0.5s;
	}
	article:hover {
		transform: translateX(12px);
	}

	h2 {
		font-size: 1.25rem;
		font-weight: normal;
	}
</style>
