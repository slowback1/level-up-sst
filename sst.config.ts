import type { SSTConfig } from "sst";
import { Bucket, SvelteKitSite, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "level-up-sst",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const table = new Table(stack, "BlogArticles", {
        fields: {
          id: "number",
          title: "string",
          body: "string",
          leadImageUrl: "string",
          leadImageThumbnailUrl: "string",
        },
        primaryIndex: { partitionKey: "id" }
      })

      const imageStorage = new Bucket(stack, "public");

      const site = new SvelteKitSite(stack, "site", {
        environment: {
          API_URL: process.env["API_URL"] ?? "",
          API_TOKEN: process.env["API_TOKEN"] ?? "",
          DATABASE_TYPE: "dynamo",
          PUBLIC_IMAGE_URL: `https://${imageStorage.bucketName}.s3.amazonaws.com/`
        },
        bind: [imageStorage, table]
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
