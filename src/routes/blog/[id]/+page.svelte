<script lang="ts">
	import type { BlogArticleData } from '$lib/types';
	import getLeadImageUrl from '$lib/utils/getLeadImageUrl';

	export let data: { article: BlogArticleData };

	let { Body, LeadImage, Title, createdAt, publishedAt, updatedAt } = data.article.attributes;

	let imageUrl = getLeadImageUrl(LeadImage);
	let href = `/blog/${data.article.id}/edit`;
</script>

<img src={imageUrl} alt="lead-img" />

<a {href}>Edit</a>

<h1>
	{Title}
</h1>

<p>
	{Body}
</p>

<style>
	p {
		white-space: pre;
	}
</style>
