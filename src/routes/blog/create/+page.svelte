<script lang="ts">
	import BlogForm from '$lib/components/BlogForm.svelte';
	import type { BlogFormImage } from '$lib/types';

	export let data: { images: BlogFormImage[] };
</script>

<h1>Create Blog Article</h1>

<BlogForm images={data.images} />
