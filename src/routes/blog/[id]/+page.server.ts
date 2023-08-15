import API from '$lib/api/api.js';

export async function load(request) {
    let id = Number(request.params.id);

    let api = new API();

    let response = await api.getBlogArticleById(id);

    return { article: response.data };
}