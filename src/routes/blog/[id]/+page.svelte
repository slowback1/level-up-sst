<script lang="ts">
	import type { BlogArticleData } from '$lib/types';
	import getLeadImageUrl from '$lib/utils/getLeadImageUrl';

	export let data: { article: BlogArticleData };

	let { Body, LeadImage, Title, createdAt, publishedAt, updatedAt } = data.article.attributes;

	let imageUrl = getLeadImageUrl(LeadImage);
</script>

<img src={imageUrl} alt="lead-img" />
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
