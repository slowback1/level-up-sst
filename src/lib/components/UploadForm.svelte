<script lang="ts">
	import { enhance } from '$app/forms';

	let acceptedImageTypes = ['png', 'jpeg'];

	let acceptString = acceptedImageTypes.map((type) => `image/${type}`).join(', ');
</script>

<form use:enhance enctype="multipart/form-data" method="post">
	<label for="file">
		Upload an image:
		<input required id="file" name="file" type="file" accept={acceptString} />
	</label>

	<input type="submit" value="Upload" />
</form>
