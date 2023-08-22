import API from '$lib/api/api.js';
import processFormData from '$lib/utils/processFormData.js';
import processImageAttribute from '$lib/utils/processImageAttribute.js';
import { redirect } from '@sveltejs/kit';


export const actions = {
    default: async (post) => {
        let id = post.route.id;
        let formData = await post.request.formData();

        let postBody = processFormData<{ title: string; body: string; image: number; }>(formData);

        let api = new API();

        await api.editBlogArticle(Number(id), {
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

export async function load(request) {
    let id = request.params.id;

    let api = new API();

    let article = await api.getBlogArticleById(Number(id));
    let images = await api.getImages();

    return { article: article.data, images: images.map(processImageAttribute) }
}