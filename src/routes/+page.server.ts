import API from "$lib/api/api";

export async function load() {
    let api = new API();

    let articleResponse = await api.getBlogArticles();

    return { articles: articleResponse.data }
}