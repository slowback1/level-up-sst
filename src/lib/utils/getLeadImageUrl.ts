import { PUBLIC_API_URL } from "$env/static/public";
import type { BlogArticleLeadImage } from "$lib/types";

export default function getLeadImageUrl(image: BlogArticleLeadImage) {
    let formats = image.data.attributes.formats;

    if (formats.large)
        return formatUrl(image.data.attributes.formats.large?.url);

    let actualKeys = Object.keys(formats);
    let keyToChoose = actualKeys[0];

    return formatUrl(formats[keyToChoose].url);
}

function formatUrl(url: string) {
    if (url.includes("http"))
        return url;

    return `${PUBLIC_API_URL}${url}`;
}