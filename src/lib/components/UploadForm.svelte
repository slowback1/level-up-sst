<script lang="ts">
	let acceptedImageTypes = ['png', 'jpeg'];

	let acceptString = acceptedImageTypes.map((type) => `image/${type}`).join(', ');
</script>

<form method="post">
	<label for="file">
		Upload an image:
		<input name="file" type="file" accept={acceptString} />
	</label>

	<input type="submit" value="Upload" />
</form>
