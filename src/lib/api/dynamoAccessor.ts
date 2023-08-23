import type { BlogArticleIDResponse, BlogArticleLeadImageAttributes, BlogArticleListResponse, CreateBlogArticleRequest } from "$lib/types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { Table } from "sst/node/table";
import type IAPI from "./IApi";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const bucket = new S3Client({});

interface DynamoBlogArticle {
    id: number;
    title: string;
    body: string;
    leadImageUrl: string;
    leadImageThumbnailUrl?: string;
}


export default class DynamoAccessor implements IAPI {
    private getTableName() {
        return Table["BlogArticles"].tableName;
    }
    private getBucketName() {
        return Bucket.public.bucketName;
    }

    async uploadFile(file: File): Promise<any> {
        const command = new PutObjectCommand({
            ACL: "public-read",
            Key: crypto.randomUUID(),
            Bucket: this.getBucketName()
        });
        const url = await getSignedUrl(bucket, command);

        await fetch(url, {
            body: file,
            headers: {
                "Content-Type": file.type,
                "Content-Disposition": `attachment; filename="${file.name}"`
            },
            method: "PUT"
        })
    }

    async getImages(): Promise<BlogArticleLeadImageAttributes[]> {
        const command = new ListObjectsV2Command({
            Bucket: this.getBucketName(),


        })

        const url = await getSignedUrl(bucket, command);



        let response = await bucket.send(command);


        return response.Contents.map(c => ({
            alternativeText: "",
            caption: "",
            createdAt: "",
            ext: "",
            formats: {
                large: {
                    ext: "",
                    hash: "",
                    height: 1,
                    mime: "",
                    name: "",
                    size: 1,
                    url: c.Key,
                    width: 1
                }
            },
            hash: "",
            height: 1,
            mime: "",
            name: "",
            previewUrl: "",
            provider: "",
            provider_metadata: "",
            size: 1,
            updatedAt: "",
            url: "",
            width: 1,
            id: 1
        }))
    }


    async getBlogArticleById(id: number): Promise<BlogArticleIDResponse> {
        let command = new GetCommand({
            TableName: this.getTableName(), Key: {
                id: id
            }
        })

        let response = await db.send(command);

        let item: DynamoBlogArticle = response.Item as DynamoBlogArticle;

        return {
            meta: {

            },
            data: {
                attributes: {
                    Body: item.body,
                    createdAt: new Date().toISOString(),
                    publishedAt: "",
                    Title: item.title,
                    updatedAt: "",
                    LeadImage: {
                        data: {
                            id: 0,
                            attributes: {
                                alternativeText: "",
                                caption: "",
                                createdAt: "",
                                ext: "",
                                formats: {
                                    large: {
                                        ext: "",
                                        hash: "",
                                        height: 320,
                                        mime: "",
                                        name: "",
                                        size: 320,
                                        url: item.leadImageUrl,
                                        width: 320
                                    }
                                },
                                hash: "",
                                height: 32,
                                mime: "",
                                name: "",
                                previewUrl: "",
                                provider: "",
                                provider_metadata: "",
                                size: 320,
                                updatedAt: "",
                                url: "",
                                width: 32,
                                id: 0
                            },
                        }
                    },
                },
                id: item.id
            }
        }

    }
    async getBlogArticles(): Promise<BlogArticleListResponse> {
        let command = new ScanCommand({
            TableName: this.getTableName(),
        });

        let response = await db.send(command);

        let items = response.Items as DynamoBlogArticle[];

        return {
            meta: {
                pagination: {
                    page: 1,
                    pageCount: 1,
                    pageSize: 100000000,
                    total: 1
                }
            },
            data: items.map(item => ({
                id: item.id,
                attributes: {
                    Body: item.body,
                    createdAt: "",
                    LeadImage: null,
                    publishedAt: "",
                    Title: item.title,
                    updatedAt: ""
                }
            }))
        }

    }

    async createBlogArticle(article: CreateBlogArticleRequest): Promise<any> {
        let item: DynamoBlogArticle = {
            body: article.data.Body,
            leadImageUrl: article.data.LeadImage.id.toString(),
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
            title: article.data.Title,

        }

        let command = new PutCommand({
            TableName: this.getTableName(),
            Item: item
        })

        let result = await db.send(command);

        return true;
    }
    async editBlogArticle(id: number, article: CreateBlogArticleRequest): Promise<any> {


        let command = new UpdateCommand({
            Key: {
                id: id
            },
            TableName: this.getTableName(),
            UpdateExpression: "SET body = :body",
            ExpressionAttributeValues: {
                // "title": article.data.Title,
                ":body": article.data.Body
            }
        })

        await db.send(command);

        return true;
    }


}