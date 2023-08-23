import ApiFactory from '$lib/api/apiFactory.js';

export async function load(request) {
    let id = Number(request.params.id);

    let api = ApiFactory.Create();

    let response = await api.getBlogArticleById(id);

    return { article: response.data };
}