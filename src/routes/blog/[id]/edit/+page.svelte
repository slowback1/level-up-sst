<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte';
	import type { BlogArticleData, BlogFormImage } from '$lib/types';

	export let data: { article: BlogArticleData; images: BlogFormImage[] };
</script>

<h1>Edit Blog</h1>

<BlogForm images={data.images} defaultValue={data.article} />
