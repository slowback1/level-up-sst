export interface BlogArticleListResponse {
    data: BlogArticleData[]
    meta: BlogArticleMeta
}

export interface BlogArticleIDResponse {
    data: BlogArticleData;
    meta: {}
}

export interface BlogArticleData {
    id: number
    attributes: BlogArticleAttributes
}

export interface BlogArticleAttributes {
    Title: string
    Body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    LeadImage: BlogArticleLeadImage
}

export interface BlogArticleLeadImage {
    data: BlogArticleLeadImageData
}

export interface BlogArticleLeadImageData {
    id: number
    attributes: BlogArticleLeadImageAttributes
}

export interface BlogArticleLeadImageAttributes {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}

export interface Formats {
    thumbnail?: BlogArticleImage
    small?: BlogArticleImage
    medium?: BlogArticleImage
    large?: BlogArticleImage
}

export interface BlogArticleImage {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    url: string
}

export interface BlogArticleMeta {
    pagination: BlogArticlePagination
}

export interface BlogArticlePagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
