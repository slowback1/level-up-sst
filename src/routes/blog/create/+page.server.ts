import API from '$lib/api/api.js';
import processFormData from '$lib/utils/processFormData.js';
import processImageAttribute from '$lib/utils/processImageAttribute.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async (post) => {
        let formData = await post.request.formData();

        let postBody = processFormData<{ title: string; body: string; image: number; }>(formData);

        let api = new API();

        await api.createBlogArticle({
            data: {
                Body: postBody.body,
                LeadImage: {
                    id: postBody.image
                },
                Title: postBody.title
            }
        })

        throw redirect(303, "/");
    }
}

export async function load() {
    let api = new API();

    let images = await api.getImages();

    const processedImages = images.map(processImageAttribute);

    return { images: processedImages }
}