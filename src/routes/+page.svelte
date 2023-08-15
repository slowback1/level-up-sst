<script lang="ts">
	import ArticleItem from '$lib/components/ArticleItem.svelte';
	import type { BlogArticleData } from '$lib/types';

	export let data: { articles: BlogArticleData[] };
	let { articles } = data;
</script>

<h1>Article Listing</h1>

<div class="article-list">
	{#each articles as article}
		<ArticleItem {article} />
	{/each}
</div>

<style>
	h1 {
		font-weight: normal;
		font-size: 1.5rem;
	}

	.article-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
