import API from '$lib/api/api.js';
import processFormData from '$lib/utils/processFormData.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async (post) => {
        let formData = await post.request.formData();

        let postBody = processFormData<{ file: File }>(formData);


        let api = new API();

        let result = await api.uploadFile(postBody.file);

        throw redirect(303, "/")
    }
}