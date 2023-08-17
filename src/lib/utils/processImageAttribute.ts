import type { BlogArticleLeadImageAttributes } from "$lib/types";
import getLeadImageUrl from "./getLeadImageUrl";

export default function processImageAttribute(image: BlogArticleLeadImageAttributes): { url: string; id: number } {
    let url = getLeadImageUrl({ data: { id: 0, attributes: image } });


    return { url, id: image.id };
}