import ApiFactory from "$lib/api/apiFactory";

export async function load() {
    let api = ApiFactory.Create();

    let articleResponse = await api.getBlogArticles();

    return { articles: articleResponse.data }
}