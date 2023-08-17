<script lang="ts">
	import type { BlogArticleData, BlogFormImage } from '$lib/types';

	export let images: BlogFormImage[];
	export let defaultValue: BlogArticleData = null;

	let title = defaultValue?.attributes.Title ?? '';
	let body = defaultValue?.attributes.Body ?? '';
	let imageId = defaultValue?.attributes.LeadImage.data.id ?? 0;
</script>

<form method="POST">
	<label for="title">
		Title
		<input name="title" bind:value={title} />
	</label>
	<label for="body">
		Body
		<textarea name="body" bind:value={body} />
	</label>

	{#each images as image}
		<label for="image" class="radio-group">
			<img
				src={image.url}
				alt={`blog-img-${image.id}`}
				data-testid="blog-form__image-radio-image"
			/>
			<input
				type="radio"
				name="image"
				data-testid="blog-form__image-radio"
				value={image.id}
				checked={imageId === image.id}
			/>
		</label>
	{/each}

	<input type="submit" value="Submit" />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	label {
		display: flex;
		flex-direction: column;
	}

	img {
		width: 240px;
	}

	.radio-group {
		flex-direction: row-reverse;
	}
</style>
